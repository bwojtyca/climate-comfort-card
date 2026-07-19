import { svg, type TemplateResult, nothing } from 'lit';
import type { PointEvaluation, Range } from './types';
import { moldThresholdRh, rhAtDewPoint, type AveragedZone } from './comfort';
import {
  GROUP_HULL_FILL,
  GROUP_HULL_STROKE,
  MOLD_HATCH_STROKE,
  ZONE_ACCEPTABLE_FILL,
  ZONE_BLUR,
  ZONE_PREFERRED_FILL,
  ZONE_STROKE,
} from './const';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** A point ready to be placed on the chart. */
export interface ChartPoint {
  index: number;
  eval: PointEvaluation;
  color: string;
  /** Where the marker is pinned when only one dimension is known. */
  pin: 'none' | 'x-axis' | 'y-axis';
}

export interface ChartLayout {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

export const DEFAULT_LAYOUT: ChartLayout = {
  width: 400,
  height: 320,
  margin: { top: 14, right: 16, bottom: 40, left: 46 },
};

interface Scales {
  x: (t: number) => number;
  y: (h: number) => number;
  plot: { left: number; right: number; top: number; bottom: number };
  tRange: Range;
  hRange: Range;
}

function makeScales(layout: ChartLayout, tempAxis: Range, humAxis: Range): Scales {
  const left = layout.margin.left;
  const right = layout.width - layout.margin.right;
  const top = layout.margin.top;
  const bottom = layout.height - layout.margin.bottom;

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  return {
    plot: { left, right, top, bottom },
    tRange: tempAxis,
    hRange: humAxis,
    x: (t) => left + ((clamp(t, tempAxis.min, tempAxis.max) - tempAxis.min) /
      (tempAxis.max - tempAxis.min)) * (right - left),
    y: (h) => bottom - ((clamp(h, humAxis.min, humAxis.max) - humAxis.min) /
      (humAxis.max - humAxis.min)) * (bottom - top),
  };
}

/** Ticks at "nice" round intervals (1/2/2.5/5 × 10ⁿ) within the range. */
function niceTicks(range: Range, target: number): number[] {
  const span = range.max - range.min;
  if (span <= 0) return [range.min];
  const raw = span / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const ticks: number[] = [];
  const start = Math.ceil(range.min / step) * step;
  for (let v = start; v <= range.max + 1e-9; v += step) {
    ticks.push(Math.round(v * 100) / 100);
  }
  return ticks;
}

/** The nested preferred/acceptable bands to draw - satisfied by both an
 *  averaged zone and a single resolved profile. */
export type ZoneBands = {
  temperature?: { preferred: Range; acceptable: Range };
  humidity?: { preferred: Range; acceptable: Range };
  dewPoint?: { preferred: Range; acceptable: Range };
};

type Level = 'preferred' | 'acceptable';

/**
 * Build the comfort polygon for one level. The temperature band sets the left
 * and right edges; at each sampled temperature the humidity is bounded by the
 * RH band and - where a dew-point band exists - by the dew-point curves, which
 * bend the top/bottom edges (the psychrometric slant a rectangle can't show).
 * Returns an SVG points string, or null if the region is empty.
 */
function comfortPolygon(level: Level, bands: ZoneBands, scales: Scales): string | null {
  const t = bands.temperature?.[level];
  const h = bands.humidity?.[level];
  const dp = bands.dewPoint?.[level];

  const tMin = t ? t.min : scales.tRange.min;
  const tMax = t ? t.max : scales.tRange.max;
  const hMax = h ? h.max : scales.hRange.max;
  const hMin = h ? h.min : scales.hRange.min;

  const STEPS = 28;
  const upper: string[] = [];
  const lower: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const temp = tMin + ((tMax - tMin) * i) / STEPS;
    let hi = hMax;
    let lo = hMin;
    if (dp) {
      hi = Math.min(hi, rhAtDewPoint(temp, dp.max));
      lo = Math.max(lo, rhAtDewPoint(temp, dp.min));
    }
    if (hi < lo) continue; // region pinched shut at this temperature
    upper.push(`${scales.x(temp)},${scales.y(hi)}`);
    lower.push(`${scales.x(temp)},${scales.y(lo)}`);
  }
  if (upper.length < 2) return null;
  return [...upper, ...lower.reverse()].join(' ');
}

/** Draw one comfort zone: acceptable polygon with the preferred polygon nested inside. */
function renderZone(zone: ZoneBands, scales: Scales, opts: { faint: boolean }): TemplateResult {
  const acceptable = comfortPolygon('acceptable', zone, scales);
  const preferred = comfortPolygon('preferred', zone, scales);
  return svg`<g opacity=${opts.faint ? 0.5 : 1}>
    ${acceptable ? svg`<polygon points=${acceptable} fill=${ZONE_ACCEPTABLE_FILL} stroke="none" />` : nothing}
    ${preferred ? svg`<polygon points=${preferred} fill=${ZONE_PREFERRED_FILL} stroke="none" />` : nothing}
  </g>`;
}

/** Crisp dashed outline of a profile's acceptable comfort polygon (hover emphasis). */
function renderHighlight(profile: ZoneBands, scales: Scales): TemplateResult {
  const points = comfortPolygon('acceptable', profile, scales);
  if (!points) return svg``;
  return svg`<polygon points=${points}
    fill="none" stroke=${ZONE_STROKE} stroke-width="1.5" stroke-dasharray="4 3" />`;
}

/**
 * A soft hint of where mold could form: the high-humidity region above the
 * cold-wall threshold curve. Kept deliberately faint (we only have air, not
 * surface, temperature) - a muted hatch with a small "?" label, no red alarm.
 */
function renderMoldRisk(scales: Scales): TemplateResult {
  const { plot, tRange, hRange } = scales;
  const STEPS = 24;
  const curve: [number, number][] = [];
  let anyVisible = false;
  for (let i = 0; i <= STEPS; i++) {
    const t = tRange.min + ((tRange.max - tRange.min) * i) / STEPS;
    const rh = moldThresholdRh(t);
    if (rh < hRange.max) anyVisible = true;
    curve.push([scales.x(t), scales.y(clamp(rh, hRange.min, hRange.max))]);
  }
  if (!anyVisible) return svg``; // threshold above the visible range - nothing to show
  const region = [...curve, [scales.x(tRange.max), plot.top], [scales.x(tRange.min), plot.top]]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
  const line = curve.map(([x, y]) => `${x},${y}`).join(' ');
  return svg`<g clip-path="url(#ccc-plot-clip)">
    <polygon points=${region} fill="url(#ccc-mold-hatch)" stroke="none" />
    <polyline points=${line} fill="none" stroke=${MOLD_HATCH_STROKE}
      stroke-width="1" stroke-dasharray="3 3" opacity="0.7" />
  </g>`;
}

/** One resampled position of a point in the past, with the comfort colour it had then. */
export interface TrailPoint {
  t: number;
  h: number;
  color: string;
}

/**
 * Fading "comet" trail from oldest to newest position. Toward the present each
 * segment gets more opacity and more width; its colour is the comfort colour
 * the point actually had at that moment, so the path shows how it was doing
 * along the way (red where it was bad, green where it was fine).
 */
function renderTrail(trail: TrailPoint[], color: string, scales: Scales, animate: boolean): TemplateResult {
  const segs: TemplateResult[] = [];
  const coords: string[] = [];
  const last = trail.length - 1;
  for (let i = 0; i < trail.length; i++) {
    coords.push(`${scales.x(trail[i].t).toFixed(1)},${scales.y(trail[i].h).toFixed(1)}`);
    if (i === 0) continue;
    const a = trail[i - 1];
    const b = trail[i];
    const frac = i / last; // 0 oldest, 1 newest
    const op = 0.12 + 0.6 * frac;
    const w = 1 + 2 * frac; // ~1px oldest -> ~3px newest
    segs.push(svg`<line x1=${scales.x(a.t)} y1=${scales.y(a.h)}
      x2=${scales.x(b.t)} y2=${scales.y(b.h)}
      stroke=${b.color} stroke-width=${w.toFixed(2)} stroke-opacity=${op.toFixed(2)}
      stroke-linecap="round" />`);
  }

  // Playhead runs the path via a CSS motion path (offset-path). CSS survives
  // the card's frequent re-renders without restarting, unlike SMIL, so it stays
  // smooth. Constant speed along the path; it lingers where the path wiggled.
  let playhead: TemplateResult | typeof nothing = nothing;
  if (animate) {
    const path = 'M' + coords.join(' L');
    const dur = Math.max(1.6, Math.min(5, trail.length * 0.09)).toFixed(1);
    playhead = svg`<circle class="ccc-playhead" r="1.5" fill=${color}
      style=${`offset-path:path('${path}');animation-duration:${dur}s`} />`;
  }

  return svg`<g clip-path="url(#ccc-plot-clip)">${segs}${playhead}</g>`;
}

/** Convex hull (monotone chain) of screen-space points, ordered CCW. */
function convexHull(pts: [number, number][]): [number, number][] {
  if (pts.length < 3) return pts;
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const pt of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0)
      lower.pop();
    lower.push(pt);
  }
  const upper: [number, number][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const pt = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0)
      upper.pop();
    upper.push(pt);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Rounded-corner path through hull vertices; corner radius ≈ marker radius. */
function roundedPolygonPath(pts: [number, number][], radius: number): string {
  const n = pts.length;
  if (n < 3) return '';
  let d = '';
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const [v1x, v1y] = [curr[0] - prev[0], curr[1] - prev[1]];
    const [v2x, v2y] = [next[0] - curr[0], next[1] - curr[1]];
    const len1 = Math.hypot(v1x, v1y) || 1;
    const len2 = Math.hypot(v2x, v2y) || 1;
    const r1 = Math.min(radius, len1 / 2);
    const r2 = Math.min(radius, len2 / 2);
    const a: [number, number] = [curr[0] - (v1x / len1) * r1, curr[1] - (v1y / len1) * r1];
    const b: [number, number] = [curr[0] + (v2x / len2) * r2, curr[1] + (v2y / len2) * r2];
    d += `${i === 0 ? 'M' : 'L'}${a[0].toFixed(1)},${a[1].toFixed(1)}`;
    d += `Q${curr[0].toFixed(1)},${curr[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  }
  return d + 'Z';
}

/**
 * A soft blob enclosing a group's points. Rather than hull the points directly
 * (which degenerates to a line for two or collinear points), we expand each
 * point into a small square and hull all the corners. One code path then covers
 * any count: a single point becomes a rounded square, and collinear points a
 * rounded capsule.
 */
function renderGroupHull(members: { t: number; h: number }[], scales: Scales): TemplateResult {
  const PAD = 10;
  const corners: [number, number][] = [];
  for (const m of members) {
    const x = scales.x(m.t);
    const y = scales.y(m.h);
    corners.push([x - PAD, y - PAD], [x + PAD, y - PAD], [x + PAD, y + PAD], [x - PAD, y + PAD]);
  }
  if (corners.length < 3) return svg``;
  const d = roundedPolygonPath(convexHull(corners), 10);
  return svg`<g clip-path="url(#ccc-plot-clip)">
    <path d=${d} fill=${GROUP_HULL_FILL} stroke=${GROUP_HULL_STROKE}
      stroke-width="1.5" stroke-linejoin="round" />
  </g>`;
}

export interface RenderChartOptions {
  layout: ChartLayout;
  tempAxis: Range;
  humAxis: Range;
  points: ChartPoint[];
  /** Member positions of the hovered group; draws a soft connecting blob. */
  groupHull?: { t: number; h: number }[];
  /** Fading history trails (oldest to newest), one per shown point. */
  trails?: { points: TrailPoint[]; color: string }[];
  /** Animate a playhead along each trail (off when the viewer prefers reduced motion). */
  animateTrails?: boolean;
  /** Persistent comfort zone (drawn when zone_display is "always"). */
  zone?: AveragedZone;
  zoneFaint: boolean;
  /** Zone emphasised for the hovered point: a soft filled field + outline. */
  highlightZone?: ZoneBands;
  hoveredIndex: number | null;
  labels: { x: string; y: string };
  /** Draw the soft mold-risk hatch hint. */
  moldRisk?: boolean;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

export function renderChart(o: RenderChartOptions): TemplateResult {
  const { layout, tempAxis, humAxis } = o;
  const scales = makeScales(layout, tempAxis, humAxis);
  const { plot } = scales;
  const xTicks = niceTicks(tempAxis, 5);
  const yTicks = niceTicks(humAxis, 5);

  return svg`
    <svg viewBox="0 0 ${layout.width} ${layout.height}" class="ccc-chart"
      role="img" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="ccc-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation=${ZONE_BLUR} />
        </filter>
        <clipPath id="ccc-plot-clip">
          <rect x=${plot.left} y=${plot.top}
            width=${plot.right - plot.left} height=${plot.bottom - plot.top} />
        </clipPath>
        <pattern id="ccc-mold-hatch" width="7" height="7"
          patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke=${MOLD_HATCH_STROKE}
            stroke-width="1" opacity="0.5" />
        </pattern>
      </defs>

      <!-- grid -->
      <g class="ccc-grid">
        ${xTicks.map((t) => svg`<line x1=${scales.x(t)} y1=${plot.top}
          x2=${scales.x(t)} y2=${plot.bottom} />`)}
        ${yTicks.map((h) => svg`<line x1=${plot.left} y1=${scales.y(h)}
          x2=${plot.right} y2=${scales.y(h)} />`)}
      </g>

      <!-- comfort zone(s): a soft, blurred field rather than hard boxes -->
      <g clip-path="url(#ccc-plot-clip)">
        ${o.zone
          ? svg`<g filter="url(#ccc-blur)">${renderZone(o.zone, scales, { faint: o.zoneFaint })}</g>`
          : nothing}
        ${o.highlightZone
          ? svg`
              <g filter="url(#ccc-blur)">${renderZone(o.highlightZone, scales, { faint: false })}</g>
              ${renderHighlight(o.highlightZone, scales)}
            `
          : nothing}
      </g>

      <!-- soft mold-risk hint -->
      ${o.moldRisk ? renderMoldRisk(scales) : nothing}

      <!-- soft blob for the hovered group -->
      ${o.groupHull && o.groupHull.length >= 1 ? renderGroupHull(o.groupHull, scales) : nothing}

      <!-- history trails -->
      ${(o.trails ?? [])
        .filter((tr) => tr.points.length > 1)
        .map((tr) => renderTrail(tr.points, tr.color, scales, o.animateTrails ?? false))}

      <!-- axes -->
      <line class="ccc-axis" x1=${plot.left} y1=${plot.bottom} x2=${plot.right} y2=${plot.bottom} />
      <line class="ccc-axis" x1=${plot.left} y1=${plot.top} x2=${plot.left} y2=${plot.bottom} />

      <!-- tick labels -->
      <g class="ccc-tick-label">
        ${xTicks.map((t) => svg`<text x=${scales.x(t)} y=${plot.bottom + 14}
          text-anchor="middle">${t}</text>`)}
        ${yTicks.map((h) => svg`<text x=${plot.left - 6} y=${scales.y(h) + 3}
          text-anchor="end">${h}</text>`)}
      </g>

      <!-- axis titles -->
      <text class="ccc-axis-title" x=${(plot.left + plot.right) / 2} y=${layout.height - 4}
        text-anchor="middle">${o.labels.x}</text>
      <text class="ccc-axis-title" transform="translate(11 ${(plot.top + plot.bottom) / 2}) rotate(-90)"
        text-anchor="middle">${o.labels.y}</text>

      <!-- points -->
      ${o.points.map((p) => renderPoint(p, scales, o))}
    </svg>
  `;
}

function renderPoint(p: ChartPoint, scales: Scales, o: RenderChartOptions): TemplateResult {
  const { plot } = scales;
  const t = p.eval.temperature?.value;
  const h = p.eval.humidity?.value;

  let cx: number;
  let cy: number;
  if (p.pin === 'x-axis' && t !== undefined) {
    cx = scales.x(t);
    cy = plot.bottom - 6; // just above the temperature axis
  } else if (p.pin === 'y-axis' && h !== undefined) {
    cx = plot.left + 6; // just right of the humidity axis
    cy = scales.y(h);
  } else if (t !== undefined && h !== undefined) {
    cx = scales.x(t);
    cy = scales.y(h);
  } else {
    return svg``;
  }

  const hovered = p.index === o.hoveredIndex;
  const r = hovered ? 8 : 6;

  return svg`<g class="ccc-point ${hovered ? 'is-hovered' : ''}"
    @mouseenter=${() => o.onHover(p.index)}
    @mouseleave=${() => o.onHover(null)}
    @click=${() => o.onSelect(p.index)}
    @focus=${() => o.onHover(p.index)}
    @blur=${() => o.onHover(null)}
    tabindex="0" role="button">
    ${hovered ? svg`<circle cx=${cx} cy=${cy} r=${r + 4} fill=${p.color} opacity="0.25" />` : nothing}
    <circle cx=${cx} cy=${cy} r=${r} fill=${p.color}
      stroke="var(--card-background-color, #fff)" stroke-width="1.5" />
  </g>`;
}
