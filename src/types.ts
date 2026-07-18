import type { LovelaceCardConfig } from 'custom-card-helpers';

/** Inclusive numeric range. */
export interface Range {
  min: number;
  max: number;
}

/**
 * A comfort profile describes, for each climate dimension, a narrower
 * "preferred" band nested inside a wider "acceptable" band. Values inside
 * `preferred` are ideal; between `preferred` and `acceptable` are tolerable;
 * outside `acceptable` are uncomfortable.
 *
 * A dimension may be omitted entirely (e.g. a profile that only cares about
 * temperature), in which case that dimension is not evaluated.
 */
export interface ComfortProfile {
  temperature?: { preferred: Range; acceptable: Range };
  humidity?: { preferred: Range; acceptable: Range };
}

/** Built-in preset identifier, or any custom string the user defines. */
export type PresetId =
  | 'living_room'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'nursery'
  | 'office'
  | 'basement'
  | 'server_room'
  | string;

/** A single measured location (e.g. one room) placed on the chart. */
export interface PointConfig {
  /** Display name shown in tooltip/legend. */
  name?: string;
  /** Entity id providing temperature (°C). Optional. */
  temperature?: string;
  /** Entity id providing relative humidity (%). Optional. */
  humidity?: string;
  /** Preset used to evaluate this point; falls back to the card default. */
  preset?: PresetId;
  /**
   * Advanced/simple custom override of the comfort profile for this point.
   * Reserved for the custom-thresholds editor modes; when present it wins
   * over `preset`. First release UI focuses on presets, but the model and
   * evaluation already honour this field.
   */
  comfort?: ComfortProfile;
  /** Optional explicit marker colour override. */
  color?: string;
}

export type ZoneMode = 'auto' | 'average' | 'hidden';

/** When comfort zones are drawn: always, only on hover, or never. */
export type ZoneDisplay = 'always' | 'hover' | 'hidden';

export interface ClimateComfortCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  /** Locations to plot. */
  points: PointConfig[];
  /** Default preset for points that don't declare their own. */
  preset?: PresetId;
  /** X-axis (temperature) range in °C. */
  temperature_axis?: Range;
  /** Y-axis (humidity) range in %. */
  humidity_axis?: Range;
  /**
   * How comfort zones are drawn when points use different profiles:
   *  - 'auto'    : draw the shared zone when uniform, else a faint average
   *  - 'average' : always draw the averaged zone
   *  - 'hidden'  : never draw zones
   */
  zone_mode?: ZoneMode;
  /** Whether comfort zones show all the time or only on hover. */
  zone_display?: ZoneDisplay;
  show_legend?: boolean;
}

/** Severity of a single dimension or of a whole point. */
export type Severity = 'good' | 'warn' | 'bad';

/** Per-dimension outcome status. */
export type DimensionStatus =
  | 'comfortable'
  | 'bit_low'
  | 'bit_high'
  | 'too_low'
  | 'too_high';

export type Dimension = 'temperature' | 'humidity';

export interface DimensionEvaluation {
  dimension: Dimension;
  value: number;
  status: DimensionStatus;
  severity: Severity;
  /** Continuous comfort in [0,1]: 1 = ideal, 0.5 = at the acceptable edge, 0 = far outside. */
  score: number;
}

export interface PointEvaluation {
  name: string;
  /** Resolved profile used for this point. */
  profile: ComfortProfile;
  temperature?: DimensionEvaluation;
  humidity?: DimensionEvaluation;
  /** Worst severity across the available dimensions (kept for status labels). */
  severity: Severity;
  /** Worst continuous comfort score across dimensions (drives the colour). */
  score: number;
  /** True when no dimension had a usable numeric value. */
  unavailable: boolean;
}
