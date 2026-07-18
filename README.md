# Climate Comfort Card

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace card that
plots the **temperature** and **humidity** of one or more rooms on a shared
comfort chart, draws comfort zones behind them, and rates each point
(comfortable / too cold / too humid / …).

> First stable release focuses on **presets** and the psychrometric comfort
> model. Custom threshold editing (simple & advanced modes) is modelled in the
> config but not yet exposed in the GUI editor.

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
2. Install **Climate Comfort Card** — it is added as a Lovelace resource
   automatically.
3. To receive pre-release (beta) builds, enable **Show beta versions** on its
   HACS page.

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
| `mold_risk` | boolean | `true` | Hatch the humid area where mold could form on cold walls (rough hint from air temperature). |
| `trail_display` | `all` \| `hover` \| `off` | `hover` | Which points show a fading history trail. |
| `trail_hours` | number | `24` | How many hours of history the trail spans (kept within the recorder's retention). |
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
| General (hallway, dining, stairs…) | 19–23 | 17–25 | 40–60 | 30–65 |
| Living room | 20–23 | 18–25 | 40–60 | 30–65 |
| Bedroom | 16–19 | 15–21 | 40–60 | 30–65 |
| Kitchen | 18–22 | 17–24 | 40–60 | 30–65 |
| Bathroom | 22–24 | 20–26 | 50–70 | 40–75 |
| Nursery | 20–22 | 19–23 | 45–60 | 40–65 |
| Office | 20–23 | 19–25 | 40–60 | 30–65 |
| Basement | 12–16 | 8–18 | 50–65 | 40–70 |
| Garage | 10–18 | 5–24 | 40–65 | 30–75 |
| Server room | 18–24 | 15–27 | 40–55 | 30–60 |

Temperatures in °C, humidity in %RH. These are sensible starting points, not
medical advice — tune them to your home.

## Comfort scoring

Comfort is **continuous**, not a threshold, and **psychrometric** — it accounts
for the way temperature and humidity interact rather than treating them as two
independent boxes.

Three band constraints are evaluated and the **worst** one wins:

1. **Temperature** (°C) — the preset's band.
2. **Relative humidity** (%) — the preset's band (dryness / dampness).
3. **Dew point** (°C, Magnus formula) — computed from temperature + humidity.
   A high dew point is muggy / mold-prone, a low one is dry. Its upper bound
   (~17 °C acceptable) cuts the warm-and-humid corner, so the comfortable region
   is a **slanted polygon**, not a rectangle: at 20 °C you can sit at ~83% RH
   before it reads "too muggy", but at 28 °C only ~51%.

Each constraint scores `[0,1]`: `1` inside *preferred*, `0.5` at the *acceptable*
edge, `0` one tolerance-width beyond. The overall score drives the marker colour
along a perceptually-even ramp (interpolated in OKLab) green → amber → red, so a
reading drifting 24 → 25 → 26 °C shades gradually rather than snapping. The zone
is drawn as a soft, blurred polygon. The text status stays categorical
("comfortable / a bit warm / too muggy") for readability.

The dew-point band is a global default (preferred 3–14 °C, acceptable −2–17 °C)
applied to any point that has both temperature and humidity; it can be
overridden per point via `comfort.dewPoint`. Dew point is only evaluated when
both readings exist — single-dimension points use just their own band.

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
