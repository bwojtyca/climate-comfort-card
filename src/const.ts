import type { Range } from './types';

export const CARD_NAME = 'climate-comfort-card';
export const EDITOR_NAME = 'climate-comfort-card-editor';
export const CARD_VERSION = '0.1.0-beta.5';

/** Fallback axis ranges when auto-scaling has nothing to work with. */
export const DEFAULT_TEMPERATURE_AXIS: Range = { min: 10, max: 32 };
export const DEFAULT_HUMIDITY_AXIS: Range = { min: 20, max: 90 };

/** Auto-scale padding added around the extreme plotted values. */
export const TEMPERATURE_PADDING = 2; // °C
export const HUMIDITY_PADDING = 10; // percentage points

/** Colour for points whose entities are unavailable. */
export const UNAVAILABLE_COLOR = 'var(--disabled-text-color, #9e9e9e)';

/** Comfort-zone fill/stroke. Green = the "good" status hue; theme-invariant so
 *  the soft field reads the same on light and dark HA themes. */
export const ZONE_PREFERRED_FILL = 'rgba(12, 163, 12, 0.30)';
export const ZONE_ACCEPTABLE_FILL = 'rgba(12, 163, 12, 0.13)';
export const ZONE_STROKE = 'rgba(12, 163, 12, 0.65)';

/** Gaussian-blur radius (viewBox units) that softens the comfort field. */
export const ZONE_BLUR = 7;
