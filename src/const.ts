import type { Range, Severity } from './types';

export const CARD_NAME = 'climate-comfort-card';
export const EDITOR_NAME = 'climate-comfort-card-editor';
export const CARD_VERSION = '0.1.0-beta.1';

/** Default chart axis ranges (chosen to keep indoor readings well framed). */
export const DEFAULT_TEMPERATURE_AXIS: Range = { min: 10, max: 32 };
export const DEFAULT_HUMIDITY_AXIS: Range = { min: 20, max: 90 };

/** Marker/label colour for each severity level. Falls back gracefully if the
 *  HA theme variables are missing. */
export const SEVERITY_COLORS: Record<Severity, string> = {
  good: 'var(--ccc-good-color, #2e9e5b)',
  warn: 'var(--ccc-warn-color, #e0a400)',
  bad: 'var(--ccc-bad-color, #e5484d)',
};

/** Zone fill colours (translucent). */
export const ZONE_PREFERRED_FILL = 'var(--ccc-preferred-fill, rgba(46, 158, 91, 0.22))';
export const ZONE_ACCEPTABLE_FILL = 'var(--ccc-acceptable-fill, rgba(46, 158, 91, 0.10))';
export const ZONE_STROKE = 'var(--ccc-zone-stroke, rgba(46, 158, 91, 0.5))';
