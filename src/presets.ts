import type { ComfortProfile, PresetId } from './types';

export interface PresetDefinition {
  id: PresetId;
  /** Localization key for the human-readable name (see localize.ts). */
  labelKey: string;
  /** Material Design icon shown in the editor picker. */
  icon: string;
  profile: ComfortProfile;
}

/**
 * Built-in comfort presets. Temperatures are °C, humidity is %RH. Ranges are
 * conservative indoor-comfort defaults drawn from common guidance
 * (comfortable air ~40-60% RH, room-dependent temperature bands). They are a
 * starting point — users can override per point via custom thresholds later.
 */
export const PRESETS: PresetDefinition[] = [
  {
    id: 'general',
    labelKey: 'preset.general',
    icon: 'mdi:home-thermometer',
    profile: {
      temperature: { preferred: { min: 19, max: 23 }, acceptable: { min: 17, max: 25 } },
      humidity: { preferred: { min: 40, max: 60 }, acceptable: { min: 30, max: 65 } },
    },
  },
  {
    id: 'living_room',
    labelKey: 'preset.living_room',
    icon: 'mdi:sofa',
    profile: {
      temperature: { preferred: { min: 20, max: 23 }, acceptable: { min: 18, max: 25 } },
      humidity: { preferred: { min: 40, max: 60 }, acceptable: { min: 30, max: 65 } },
    },
  },
  {
    id: 'bedroom',
    labelKey: 'preset.bedroom',
    icon: 'mdi:bed',
    profile: {
      temperature: { preferred: { min: 16, max: 19 }, acceptable: { min: 15, max: 21 } },
      humidity: { preferred: { min: 40, max: 60 }, acceptable: { min: 30, max: 65 } },
    },
  },
  {
    id: 'kitchen',
    labelKey: 'preset.kitchen',
    icon: 'mdi:stove',
    profile: {
      temperature: { preferred: { min: 18, max: 22 }, acceptable: { min: 17, max: 24 } },
      humidity: { preferred: { min: 40, max: 60 }, acceptable: { min: 30, max: 65 } },
    },
  },
  {
    id: 'bathroom',
    labelKey: 'preset.bathroom',
    icon: 'mdi:shower',
    profile: {
      temperature: { preferred: { min: 22, max: 24 }, acceptable: { min: 20, max: 26 } },
      humidity: { preferred: { min: 50, max: 70 }, acceptable: { min: 40, max: 75 } },
    },
  },
  {
    id: 'nursery',
    labelKey: 'preset.nursery',
    icon: 'mdi:baby-carriage',
    profile: {
      temperature: { preferred: { min: 20, max: 22 }, acceptable: { min: 19, max: 23 } },
      humidity: { preferred: { min: 45, max: 60 }, acceptable: { min: 40, max: 65 } },
    },
  },
  {
    id: 'office',
    labelKey: 'preset.office',
    icon: 'mdi:desk',
    profile: {
      temperature: { preferred: { min: 20, max: 23 }, acceptable: { min: 19, max: 25 } },
      humidity: { preferred: { min: 40, max: 60 }, acceptable: { min: 30, max: 65 } },
    },
  },
  {
    id: 'basement',
    labelKey: 'preset.basement',
    icon: 'mdi:home-floor-negative-1',
    profile: {
      temperature: { preferred: { min: 12, max: 16 }, acceptable: { min: 8, max: 18 } },
      humidity: { preferred: { min: 50, max: 65 }, acceptable: { min: 40, max: 70 } },
    },
  },
  {
    id: 'garage',
    labelKey: 'preset.garage',
    icon: 'mdi:garage',
    profile: {
      temperature: { preferred: { min: 10, max: 18 }, acceptable: { min: 5, max: 24 } },
      humidity: { preferred: { min: 40, max: 65 }, acceptable: { min: 30, max: 75 } },
    },
  },
  {
    id: 'server_room',
    labelKey: 'preset.server_room',
    icon: 'mdi:server',
    profile: {
      temperature: { preferred: { min: 18, max: 24 }, acceptable: { min: 15, max: 27 } },
      humidity: { preferred: { min: 40, max: 55 }, acceptable: { min: 30, max: 60 } },
    },
  },
];

export const DEFAULT_PRESET: PresetId = 'living_room';

const PRESET_MAP = new Map(PRESETS.map((p) => [p.id, p]));

export function getPreset(id: PresetId | undefined): PresetDefinition | undefined {
  return id ? PRESET_MAP.get(id) : undefined;
}

export function getPresetProfile(id: PresetId | undefined): ComfortProfile | undefined {
  return getPreset(id)?.profile;
}
