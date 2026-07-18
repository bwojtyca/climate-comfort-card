import type {
  ComfortProfile,
  Dimension,
  DimensionEvaluation,
  DimensionStatus,
  PointConfig,
  PointEvaluation,
  Range,
  Severity,
} from './types';
import { getPresetProfile, DEFAULT_PRESET } from './presets';
import { DEFAULT_DEWPOINT, MOLD_RISK_SURFACE_RH, MOLD_SURFACE_DROP } from './const';

const SEVERITY_RANK: Record<Severity, number> = { good: 0, warn: 1, bad: 2 };

export function worseSeverity(a: Severity, b: Severity): Severity {
  return SEVERITY_RANK[a] >= SEVERITY_RANK[b] ? a : b;
}

/**
 * Resolve the comfort profile for a point: an explicit `comfort` override wins,
 * otherwise the point's preset, otherwise the card-level default preset.
 */
export function resolveProfile(
  point: PointConfig,
  cardPreset: string | undefined,
): ComfortProfile {
  const base =
    point.comfort ??
    getPresetProfile(point.preset) ??
    getPresetProfile(cardPreset) ??
    getPresetProfile(DEFAULT_PRESET) ??
    {};
  return withDewPointDefault(base);
}

/** Attach the global dew-point band to any profile that has both temperature
 *  and humidity but no explicit dew-point band. Never mutates the input. */
function withDewPointDefault(profile: ComfortProfile): ComfortProfile {
  if (profile.temperature && profile.humidity && !profile.dewPoint) {
    return { ...profile, dewPoint: DEFAULT_DEWPOINT };
  }
  return profile;
}

const MAGNUS_A = 17.62;
const MAGNUS_B = 243.12;

/** Dew point (°C) from temperature (°C) and relative humidity (%), Magnus form. */
export function dewPointC(tempC: number, rhPercent: number): number {
  const rh = clamp(rhPercent, 0.1, 100);
  const gamma = Math.log(rh / 100) + (MAGNUS_A * tempC) / (MAGNUS_B + tempC);
  return (MAGNUS_B * gamma) / (MAGNUS_A - gamma);
}

/** Inverse: the relative humidity (%) that yields dew point `dp` at temperature `tempC`. */
export function rhAtDewPoint(tempC: number, dp: number): number {
  const gamma = (MAGNUS_A * dp) / (MAGNUS_B + dp);
  const rh = 100 * Math.exp(gamma - (MAGNUS_A * tempC) / (MAGNUS_B + tempC));
  return clamp(rh, 0, 100);
}

/** Saturation vapour pressure (Magnus); only ratios are used, so units cancel. */
const saturationPressure = (tempC: number) =>
  6.112 * Math.exp((MAGNUS_A * tempC) / (MAGNUS_B + tempC));

/** Relative humidity a colder wall surface sees, given air temperature + RH. */
export function moldSurfaceRh(tempC: number, rhPercent: number): number {
  return rhPercent * (saturationPressure(tempC) / saturationPressure(tempC - MOLD_SURFACE_DROP));
}

/** Air RH at which the assumed cold wall reaches the mold threshold, per temperature. */
export function moldThresholdRh(tempC: number): number {
  return (
    MOLD_RISK_SURFACE_RH *
    (saturationPressure(tempC - MOLD_SURFACE_DROP) / saturationPressure(tempC))
  );
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * Continuous comfort in [0,1] for a value against a preferred/acceptable pair.
 * Comfort does not flip at a threshold - it decays smoothly:
 *  - anywhere inside `preferred`              -> 1 (ideal)
 *  - at the `acceptable` edge                 -> 0.5 (borderline)
 *  - one more tolerance-width past acceptable -> 0 (clearly bad)
 * The tolerance width is the gap between the preferred and acceptable edges on
 * the side the value strays toward.
 */
function dimensionScore(value: number, bands: { preferred: Range; acceptable: Range }): number {
  const { preferred, acceptable } = bands;
  if (value >= preferred.min && value <= preferred.max) return 1;
  const [edgePref, edgeAcc] =
    value > preferred.max
      ? [preferred.max, acceptable.max]
      : [preferred.min, acceptable.min];
  const tol = Math.abs(edgeAcc - edgePref) || 1;
  const norm = Math.abs(value - edgePref) / tol; // 0 at preferred edge, 1 at acceptable edge
  return clamp(1 - 0.5 * norm, 0, 1);
}

/**
 * Evaluate one numeric value against a preferred/acceptable band pair. The
 * `status`/`severity` buckets drive the text label; `score` is the continuous
 * comfort used for colour.
 */
function evaluateDimension(
  dimension: Dimension,
  value: number,
  bands: { preferred: Range; acceptable: Range },
): DimensionEvaluation {
  const { preferred, acceptable } = bands;
  let status: DimensionStatus;
  let severity: Severity;

  if (value >= preferred.min && value <= preferred.max) {
    status = 'comfortable';
    severity = 'good';
  } else if (value < acceptable.min) {
    status = 'too_low';
    severity = 'bad';
  } else if (value > acceptable.max) {
    status = 'too_high';
    severity = 'bad';
  } else if (value < preferred.min) {
    status = 'bit_low';
    severity = 'warn';
  } else {
    status = 'bit_high';
    severity = 'warn';
  }

  return { dimension, value, status, severity, score: dimensionScore(value, bands) };
}

/** Parse an entity state into a finite number, or undefined. */
export function toNumber(state: string | undefined): number | undefined {
  if (state === undefined) return undefined;
  const n = Number(state);
  return Number.isFinite(n) ? n : undefined;
}

export interface EvaluateInput {
  name: string;
  profile: ComfortProfile;
  temperature?: number;
  humidity?: number;
}

export function evaluatePoint(input: EvaluateInput): PointEvaluation {
  const { name, profile } = input;
  let severity: Severity = 'good';
  let score = 1;
  let temperature: DimensionEvaluation | undefined;
  let humidity: DimensionEvaluation | undefined;

  if (input.temperature !== undefined && profile.temperature) {
    temperature = evaluateDimension('temperature', input.temperature, profile.temperature);
    severity = worseSeverity(severity, temperature.severity);
    score = Math.min(score, temperature.score);
  }
  if (input.humidity !== undefined && profile.humidity) {
    humidity = evaluateDimension('humidity', input.humidity, profile.humidity);
    severity = worseSeverity(severity, humidity.severity);
    score = Math.min(score, humidity.score);
  }

  // Dew point couples the two: only computable when both readings exist.
  let dewPoint: DimensionEvaluation | undefined;
  if (input.temperature !== undefined && input.humidity !== undefined && profile.dewPoint) {
    const dp = dewPointC(input.temperature, input.humidity);
    dewPoint = evaluateDimension('dewpoint', Math.round(dp * 10) / 10, profile.dewPoint);
    severity = worseSeverity(severity, dewPoint.severity);
    score = Math.min(score, dewPoint.score);
  }

  const unavailable = !temperature && !humidity;
  return { name, profile, temperature, humidity, dewPoint, severity, score, unavailable };
}

/** Average a list of ranges component-wise. */
function averageRanges(ranges: Range[]): Range | undefined {
  if (ranges.length === 0) return undefined;
  const sum = ranges.reduce(
    (acc, r) => ({ min: acc.min + r.min, max: acc.max + r.max }),
    { min: 0, max: 0 },
  );
  return { min: sum.min / ranges.length, max: sum.max / ranges.length };
}

export interface AveragedZone {
  temperature?: { preferred: Range; acceptable: Range };
  humidity?: { preferred: Range; acceptable: Range };
  dewPoint?: { preferred: Range; acceptable: Range };
  /** How many distinct profiles were combined. 1 means a single shared zone. */
  sources: number;
  /** True when every source profile was identical. */
  uniform: boolean;
}

/**
 * Combine the profiles of several points into a single drawable zone.
 * Returns component-wise averages plus metadata used to decide opacity/labels.
 */
export function averageProfiles(profiles: ComfortProfile[]): AveragedZone | undefined {
  if (profiles.length === 0) return undefined;

  const tempPreferred = profiles.map((p) => p.temperature?.preferred).filter(isRange);
  const tempAcceptable = profiles.map((p) => p.temperature?.acceptable).filter(isRange);
  const humPreferred = profiles.map((p) => p.humidity?.preferred).filter(isRange);
  const humAcceptable = profiles.map((p) => p.humidity?.acceptable).filter(isRange);

  const key = (p: ComfortProfile) => JSON.stringify(p);
  const uniform = profiles.every((p) => key(p) === key(profiles[0]));

  const zone: AveragedZone = { sources: profiles.length, uniform };

  const tp = averageRanges(tempPreferred);
  const ta = averageRanges(tempAcceptable);
  if (tp && ta) zone.temperature = { preferred: tp, acceptable: ta };

  const hp = averageRanges(humPreferred);
  const ha = averageRanges(humAcceptable);
  if (hp && ha) zone.humidity = { preferred: hp, acceptable: ha };

  const dpp = averageRanges(profiles.map((p) => p.dewPoint?.preferred).filter(isRange));
  const dpa = averageRanges(profiles.map((p) => p.dewPoint?.acceptable).filter(isRange));
  if (dpp && dpa) zone.dewPoint = { preferred: dpp, acceptable: dpa };

  return zone;
}

function isRange(r: Range | undefined): r is Range {
  return r !== undefined;
}

/** Map a dimension evaluation to its localization key (e.g. 'status.too_cold'). */
export function statusKey(ev: DimensionEvaluation): string {
  if (ev.status === 'comfortable') return 'status.comfortable';
  switch (ev.dimension) {
    case 'temperature':
      switch (ev.status) {
        case 'too_low':
          return 'status.too_cold';
        case 'too_high':
          return 'status.too_hot';
        case 'bit_low':
          return 'status.bit_cold';
        case 'bit_high':
          return 'status.bit_warm';
      }
      break;
    case 'dewpoint':
      // High dew point = muggy/mold; low dew point reuses the dryness labels.
      switch (ev.status) {
        case 'too_high':
          return 'status.too_muggy';
        case 'bit_high':
          return 'status.bit_muggy';
        case 'too_low':
          return 'status.too_dry';
        case 'bit_low':
          return 'status.bit_dry';
      }
      break;
    case 'humidity':
      switch (ev.status) {
        case 'too_low':
          return 'status.too_dry';
        case 'too_high':
          return 'status.too_humid';
        case 'bit_low':
          return 'status.bit_dry';
        case 'bit_high':
          return 'status.bit_humid';
      }
      break;
  }
  return 'status.comfortable';
}
