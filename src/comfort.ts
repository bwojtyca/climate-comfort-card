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
  if (point.comfort) return point.comfort;
  return (
    getPresetProfile(point.preset) ??
    getPresetProfile(cardPreset) ??
    getPresetProfile(DEFAULT_PRESET) ??
    {}
  );
}

/**
 * Evaluate one numeric value against a preferred/acceptable band pair.
 * `low`/`high` control which status names are used (cold/hot vs dry/humid).
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

  return { dimension, value, status, severity };
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
  let temperature: DimensionEvaluation | undefined;
  let humidity: DimensionEvaluation | undefined;

  if (input.temperature !== undefined && profile.temperature) {
    temperature = evaluateDimension('temperature', input.temperature, profile.temperature);
    severity = worseSeverity(severity, temperature.severity);
  }
  if (input.humidity !== undefined && profile.humidity) {
    humidity = evaluateDimension('humidity', input.humidity, profile.humidity);
    severity = worseSeverity(severity, humidity.severity);
  }

  const unavailable = !temperature && !humidity;
  return { name, profile, temperature, humidity, severity, unavailable };
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

  return zone;
}

function isRange(r: Range | undefined): r is Range {
  return r !== undefined;
}

/** Map a dimension evaluation to its localization key (e.g. 'status.too_cold'). */
export function statusKey(ev: DimensionEvaluation): string {
  if (ev.status === 'comfortable') return 'status.comfortable';
  const cold = ev.dimension === 'temperature';
  switch (ev.status) {
    case 'too_low':
      return cold ? 'status.too_cold' : 'status.too_dry';
    case 'too_high':
      return cold ? 'status.too_hot' : 'status.too_humid';
    case 'bit_low':
      return cold ? 'status.bit_cold' : 'status.bit_dry';
    case 'bit_high':
      return cold ? 'status.bit_warm' : 'status.bit_humid';
  }
}
