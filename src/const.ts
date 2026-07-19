import type { Range } from './types';

export const CARD_NAME = 'climate-comfort-card';
export const EDITOR_NAME = 'climate-comfort-card-editor';
export const CARD_VERSION = '0.2.1-beta.1';

/** Fallback axis ranges when auto-scaling has nothing to work with. */
export const DEFAULT_TEMPERATURE_AXIS: Range = { min: 10, max: 32 };
export const DEFAULT_HUMIDITY_AXIS: Range = { min: 20, max: 90 };

/**
 * Auto-scale padding is proportional to the spread of the plotted values
 * (`PADDING_FACTOR` × spread on each side), clamped to a min/max per axis so a
 * tight cluster still gets breathing room and a wide spread isn't over-padded.
 */
export const PADDING_FACTOR = 0.5;
export const TEMPERATURE_PADDING = { min: 0.5, max: 2 }; // °C
export const HUMIDITY_PADDING = { min: 3, max: 10 }; // percentage points

/**
 * Global default dew-point comfort band (°C), applied to any profile that has
 * both temperature and humidity. Upper bound ≈ mugginess / mold risk (cuts the
 * warm+humid corner); lower bound ≈ dryness. Tunable / overridable per profile.
 */
export const DEFAULT_DEWPOINT: { preferred: Range; acceptable: Range } = {
  preferred: { min: 3, max: 14 },
  acceptable: { min: -2, max: 17 },
};

/**
 * Mold-risk hint. We only know air readings, not wall-surface temperature, so
 * this is deliberately a soft indication: assume the coldest surface sits
 * `MOLD_SURFACE_DROP` °C below the air, and flag where its relative humidity
 * would exceed `MOLD_RISK_SURFACE_RH` % (mold-germination threshold, ISO 13788).
 */
export const MOLD_SURFACE_DROP = 5; // °C
export const MOLD_RISK_SURFACE_RH = 80; // %
/** Muted ochre hatch - reads as "damp" without the alarm of a red zone. */
export const MOLD_HATCH_STROKE = 'var(--ccc-mold-stroke, rgba(158, 130, 74, 0.55))';

/** Soft blob connecting a hovered group's points. */
export const GROUP_HULL_FILL = 'var(--ccc-group-fill, rgba(120, 140, 170, 0.12))';
export const GROUP_HULL_STROKE = 'var(--ccc-group-stroke, rgba(120, 140, 170, 0.6))';

/** Colour for points whose entities are unavailable. */
export const UNAVAILABLE_COLOR = 'var(--disabled-text-color, #9e9e9e)';

/** Comfort-zone fill/stroke. Green = the "good" status hue; theme-invariant so
 *  the soft field reads the same on light and dark HA themes. */
export const ZONE_PREFERRED_FILL = 'rgba(12, 163, 12, 0.30)';
export const ZONE_ACCEPTABLE_FILL = 'rgba(12, 163, 12, 0.13)';
export const ZONE_STROKE = 'rgba(12, 163, 12, 0.65)';

/** Gaussian-blur radius (viewBox units) that softens the comfort field. */
export const ZONE_BLUR = 7;
