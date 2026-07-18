import { svg, type TemplateResult, nothing } from 'lit';
import type { ComfortProfile, PointEvaluation, Range } from './types';
import type { AveragedZone } from './comfort';
import {
  SEVERITY_COLORS,
  ZONE_ACCEPTABLE_FILL,
  ZONE_PREFERRED_FILL,
  ZONE_STROKE,
} from './const';

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
}

function makeScales(layout: ChartLayout, tempAxis: Range, humAxis: Range): Scales {
  const left = layout.margin.left;
  const right = layout.width - layout.margin.right;
  const top = layout.margin.top;
  const bottom = layout.height - layout.margin.bottom;

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  return {
    plot: { left, right, top, bottom },
    x: (t) => left + ((clamp(t, tempAxis.min, tempAxis.max) - tempAxis.min) /
      (tempAxis.max - tempAxis.min)) * (right - left),
    y: (h) => bottom - ((clamp(h, humAxis.min, humAxis.max) - humAxis.min) /
      (humAxis.max - humAxis.min)) * (bottom - top),
  };
}

function niceTicks(range: Range, count: number): number[] {
  const step = (range.max - range.min) / count;
  const ticks: number[] = [];
  for (let i = 0; i <= count; i++) ticks.push(Math.round(range.min + step * i));
  return ticks;
}

/** Draw one comfort zone (acceptable band with preferred band nested inside). */
function renderZone(
  zone: AveragedZone,
  scales: Scales,
  opts: { faint: boolean },
): TemplateResult {
  const { plot } = scales;
  const opacity = opts.faint ? 0.5 : 1;

  const rectFor = (band: { temp?: Range; hum?: Range }, fill: string) => {
    const x0 = band.temp ? scales.x(band.temp.min) : plot.left;
    const x1 = band.temp ? scales.x(band.temp.max) : plot.right;
    const y0 = band.hum ? scales.y(band.hum.max) : plot.top;
    const y1 = band.hum ? scales.y(band.hum.min) : plot.bottom;
    return svg`<rect x=${x0} y=${y0} width=${x1 - x0} height=${y1 - y0}
      fill=${fill} stroke="none" rx="2" />`;
  };

  return svg`<g opacity=${opacity}>
    ${rectFor({ temp: zone.temperature?.acceptable, hum: zone.humidity?.acceptable }, ZONE_ACCEPTABLE_FILL)}
    ${rectFor({ temp: zone.temperature?.preferred, hum: zone.humidity?.preferred }, ZONE_PREFERRED_FILL)}
  </g>`;
}

/** Outline a single profile's preferred zone (used to highlight on hover). */
function renderHighlight(profile: ComfortProfile, scales: Scales): TemplateResult {
  const { plot } = scales;
  const x0 = profile.temperature ? scales.x(profile.temperature.acceptable.min) : plot.left;
  const x1 = profile.temperature ? scales.x(profile.temperature.acceptable.max) : plot.right;
  const y0 = profile.humidity ? scales.y(profile.humidity.acceptable.max) : plot.top;
  const y1 = profile.humidity ? scales.y(profile.humidity.acceptable.min) : plot.bottom;
  return svg`<rect x=${x0} y=${y0} width=${x1 - x0} height=${y1 - y0}
    fill="none" stroke=${ZONE_STROKE} stroke-width="1.5" stroke-dasharray="4 3" rx="2" />`;
}

export interface RenderChartOptions {
  layout: ChartLayout;
  tempAxis: Range;
  humAxis: Range;
  points: ChartPoint[];
  zone?: AveragedZone;
  zoneFaint: boolean;
  hoveredIndex: number | null;
  labels: { x: string; y: string };
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

export function renderChart(o: RenderChartOptions): TemplateResult {
  const { layout, tempAxis, humAxis } = o;
  const scales = makeScales(layout, tempAxis, humAxis);
  const { plot } = scales;
  const xTicks = niceTicks(tempAxis, 5);
  const yTicks = niceTicks(humAxis, 5);

  const hoveredPoint = o.points.find((p) => p.index === o.hoveredIndex);

  return svg`
    <svg viewBox="0 0 ${layout.width} ${layout.height}" class="ccc-chart"
      role="img" preserveAspectRatio="xMidYMid meet">
      <!-- grid -->
      <g class="ccc-grid">
        ${xTicks.map((t) => svg`<line x1=${scales.x(t)} y1=${plot.top}
          x2=${scales.x(t)} y2=${plot.bottom} />`)}
        ${yTicks.map((h) => svg`<line x1=${plot.left} y1=${scales.y(h)}
          x2=${plot.right} y2=${scales.y(h)} />`)}
      </g>

      <!-- comfort zone(s) -->
      ${o.zone ? renderZone(o.zone, scales, { faint: o.zoneFaint }) : nothing}
      ${hoveredPoint ? renderHighlight(hoveredPoint.eval.profile, scales) : nothing}

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

export function colorForSeverity(severity: PointEvaluation['severity']): string {
  return SEVERITY_COLORS[severity];
}
