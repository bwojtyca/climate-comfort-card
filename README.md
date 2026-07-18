# Climate Comfort Card

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace card that
plots the **temperature** and **humidity** of one or more rooms on a shared
comfort chart, draws comfort zones behind them, and rates each point
(comfortable / too cold / too humid / …).

> Status: early development — first release focuses on **presets**. Custom
> threshold editing (simple & advanced modes) is modelled in the config but not
> yet exposed in the GUI editor.

## What it does

- **X axis = temperature, Y axis = humidity.** Each room is a single point.
- Behind the points, a **comfort zone** is drawn: an inner *preferred* band
  nested inside a wider *acceptable* band.
- Each point gets a **status** and colour: green (comfortable), amber
  (borderline), red (uncomfortable). A tooltip shows the per-dimension detail.
- **Multiple rooms** share one chart. When rooms use different presets the zone
  is averaged (or hidden); hovering a point highlights *its own* comfort zone.
- A point may provide **both entities or just one**. With a single dimension the
  point is pinned to the matching axis and only that dimension is evaluated.
- **Presets** (living room, bedroom, kitchen, bathroom, nursery, office,
  basement, server room) or a card-wide default preset.

## Installation

### HACS (recommended)

1. In HACS, add this repository as a **custom repository** (category: *Dashboard*):
   `https://github.com/bwojtyca/climate-comfort-card`.
2. While the card is in beta, enable **Show beta versions** on its HACS page
   (early releases are published as GitHub pre-releases and are otherwise hidden).
3. Install **Climate Comfort Card** — it is added as a Lovelace resource
   automatically.

### Manual

1. Download `climate-comfort-card.js` from a release.
2. Copy it to `config/www/`.
3. Add the resource in *Settings → Dashboards → Resources*:
   `/local/climate-comfort-card.js` (type: JavaScript module).

## Configuration

The card ships with a **visual editor** (GUI). YAML is also supported:

```yaml
type: custom:climate-comfort-card
title: Home comfort
preset: living_room        # default preset for points without their own
zone_mode: auto            # auto | average | hidden
show_legend: true
points:
  - name: Living room
    temperature: sensor.living_room_temperature
    humidity: sensor.living_room_humidity
    # preset omitted -> uses the card default (living_room)
  - name: Bedroom
    temperature: sensor.bedroom_temperature
    humidity: sensor.bedroom_humidity
    preset: bedroom
  - name: Bathroom humidity
    humidity: sensor.bathroom_humidity   # single dimension -> pinned to Y axis
    preset: bathroom
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | – | Card header. |
| `points` | list | `[]` | Rooms to plot (see below). |
| `preset` | string | `living_room` | Default preset for points without their own. |
| `zone_mode` | `auto` \| `average` \| `hidden` | `auto` | How comfort zones are combined for mixed presets. |
| `zone_display` | `always` \| `hover` \| `hidden` | `always` | Show comfort zones all the time, only for the hovered point, or never. |
| `show_legend` | boolean | `true` | Show the per-room legend under the chart. |
| `temperature_axis` | `{min,max}` | auto-fit | X-axis range (°C). Omit to auto-fit to points ±2 °C. |
| `humidity_axis` | `{min,max}` | auto-fit | Y-axis range (%). Omit to auto-fit to points ±10 pp. |

Each **point**:

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Display name (defaults to the entity's friendly name). |
| `temperature` | entity id | Temperature source (°C). Optional. |
| `humidity` | entity id | Humidity source (%). Optional. |
| `preset` | string | Preset for this point; falls back to the card default. |
| `color` | string | Override the marker colour. |

## Presets

| Preset | Temp preferred | Temp acceptable | Humidity preferred | Humidity acceptable |
| --- | --- | --- | --- | --- |
| Living room | 20–23 | 18–25 | 40–60 | 30–65 |
| Bedroom | 16–19 | 15–21 | 40–60 | 30–65 |
| Kitchen | 18–22 | 17–24 | 40–60 | 30–65 |
| Bathroom | 22–24 | 20–26 | 50–70 | 40–75 |
| Nursery | 20–22 | 19–23 | 45–60 | 40–65 |
| Office | 20–23 | 19–25 | 40–60 | 30–65 |
| Basement | 12–16 | 8–18 | 50–65 | 40–70 |
| Server room | 18–24 | 15–27 | 40–55 | 30–60 |

Temperatures in °C, humidity in %RH. These are sensible starting points, not
medical advice — tune them to your home.

## Comfort scoring

Comfort is **continuous**, not a threshold. Each dimension gets a score in
`[0,1]`: `1` inside the *preferred* band, `0.5` at the edge of the *acceptable*
band, and `0` one tolerance-width beyond it. A point's overall score is the
worse of its two dimensions. That score drives the marker colour along a
perceptually-even ramp (interpolated in OKLab) from green → amber → red, so a
reading drifting from 24 → 25 → 26 °C shades gradually rather than snapping. The
comfort zone itself is drawn as a soft, blurred field for the same reason. The
text status ("comfortable / a bit warm / too hot") stays categorical for
readability.

## Development

```bash
npm install
npm run build      # bundle to dist/climate-comfort-card.js
npm run watch      # rebuild on change
npm run typecheck  # type-only check
```

The bundle output is `dist/climate-comfort-card.js`. **This file is committed
to the repository** so HACS can find it on the branch (required while only
pre-releases are published). Re-run `npm run build` and commit `dist/` whenever
you change `src/`. The release workflow rebuilds it independently for release
assets.

## Roadmap

- Custom threshold editing in the GUI (simple min/max and advanced modes).
- Mold-risk / dry-air rules based on dew point.
- Per-point history trails on the chart.

## License

MIT — see [LICENSE](LICENSE).
