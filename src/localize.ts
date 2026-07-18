/**
 * Minimal localization. Keys are looked up for the active HA language and fall
 * back to English. Only two languages ship for the first release (en, pl);
 * adding a language is just another entry in STRINGS.
 */
type Dict = Record<string, string>;

const EN: Dict = {
  'card.name': 'Climate Comfort Card',
  'card.description': 'Plot temperature/humidity for rooms on a shared comfort chart.',
  'card.no_points': 'No points configured yet. Add at least one location.',
  'card.unavailable': 'unavailable',

  'axis.temperature': 'Temperature (°C)',
  'axis.humidity': 'Humidity (%)',

  'status.comfortable': 'Comfortable',
  'status.too_cold': 'Too cold',
  'status.too_hot': 'Too hot',
  'status.too_dry': 'Too dry',
  'status.too_humid': 'Too humid',
  'status.bit_cold': 'A bit cold',
  'status.bit_warm': 'A bit warm',
  'status.bit_dry': 'A bit dry',
  'status.bit_humid': 'A bit humid',
  'status.too_muggy': 'Too muggy',
  'status.bit_muggy': 'A bit muggy',

  'label.dew_point': 'Dew point',

  'preset.general': 'General',
  'preset.living_room': 'Living room',
  'preset.bedroom': 'Bedroom',
  'preset.kitchen': 'Kitchen',
  'preset.bathroom': 'Bathroom',
  'preset.nursery': 'Nursery',
  'preset.office': 'Office',
  'preset.basement': 'Basement',
  'preset.garage': 'Garage',
  'preset.server_room': 'Server room',

  'editor.title': 'Title',
  'editor.default_preset': 'Default preset',
  'editor.zone_mode': 'Comfort zones',
  'editor.zone_mode.auto': 'Auto',
  'editor.zone_mode.average': 'Averaged',
  'editor.zone_mode.hidden': 'Hidden',
  'editor.show_legend': 'Show legend',
  'editor.zones': 'Comfort zones',
  'editor.zones.always': 'Always',
  'editor.zones.hover': 'On hover',
  'editor.zones.hidden': 'Hidden',
  'editor.points': 'Points (rooms)',
  'editor.add_point': 'Add point',
  'editor.point_name': 'Name',
  'editor.point_name_helper': 'Overrides the entity name; leave blank to use it',
  'editor.temperature_entity': 'Temperature entity',
  'editor.humidity_entity': 'Humidity entity',
  'editor.point_preset': 'Preset',
  'editor.use_default': 'Use default',
  'editor.remove': 'Remove',
  'editor.legend': 'Legend',
};

const PL: Dict = {
  'card.name': 'Karta Komfortu Klimatu',
  'card.description': 'Nanieś temperaturę/wilgotność pokoi na wspólny wykres komfortu.',
  'card.no_points': 'Brak skonfigurowanych punktów. Dodaj co najmniej jedną lokalizację.',
  'card.unavailable': 'niedostępny',

  'axis.temperature': 'Temperatura (°C)',
  'axis.humidity': 'Wilgotność (%)',

  'status.comfortable': 'Komfortowo',
  'status.too_cold': 'Za zimno',
  'status.too_hot': 'Za ciepło',
  'status.too_dry': 'Za sucho',
  'status.too_humid': 'Za wilgotno',
  'status.bit_cold': 'Nieco zimno',
  'status.bit_warm': 'Nieco ciepło',
  'status.bit_dry': 'Nieco sucho',
  'status.bit_humid': 'Nieco wilgotno',
  'status.too_muggy': 'Zbyt parno',
  'status.bit_muggy': 'Nieco parno',

  'label.dew_point': 'Punkt rosy',

  'preset.general': 'Ogólny',
  'preset.living_room': 'Salon',
  'preset.bedroom': 'Sypialnia',
  'preset.kitchen': 'Kuchnia',
  'preset.bathroom': 'Łazienka',
  'preset.nursery': 'Pokój dziecięcy',
  'preset.office': 'Gabinet',
  'preset.basement': 'Piwnica',
  'preset.garage': 'Garaż',
  'preset.server_room': 'Serwerownia',

  'editor.title': 'Tytuł',
  'editor.default_preset': 'Domyślny preset',
  'editor.zone_mode': 'Strefy komfortu',
  'editor.zone_mode.auto': 'Automatyczne',
  'editor.zone_mode.average': 'Uśrednione',
  'editor.zone_mode.hidden': 'Ukryte',
  'editor.show_legend': 'Pokaż legendę',
  'editor.zones': 'Strefy komfortu',
  'editor.zones.always': 'Zawsze',
  'editor.zones.hover': 'Przy najechaniu',
  'editor.zones.hidden': 'Ukryte',
  'editor.points': 'Punkty (pokoje)',
  'editor.add_point': 'Dodaj punkt',
  'editor.point_name': 'Nazwa',
  'editor.point_name_helper': 'Nadpisuje nazwę encji; zostaw puste, aby jej użyć',
  'editor.temperature_entity': 'Encja temperatury',
  'editor.humidity_entity': 'Encja wilgotności',
  'editor.point_preset': 'Preset',
  'editor.use_default': 'Użyj domyślnego',
  'editor.remove': 'Usuń',
  'editor.legend': 'Legenda',
};

const STRINGS: Record<string, Dict> = { en: EN, pl: PL };

export function localize(key: string, language?: string): string {
  const lang = (language ?? 'en').split('-')[0].toLowerCase();
  return STRINGS[lang]?.[key] ?? EN[key] ?? key;
}
