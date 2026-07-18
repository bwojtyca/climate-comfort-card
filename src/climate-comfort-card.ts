import { LitElement, html, css, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

import type {
  ClimateComfortCardConfig,
  ComfortProfile,
  DimensionEvaluation,
  PointConfig,
  PointEvaluation,
  Range,
} from './types';
import {
  CARD_NAME,
  CARD_VERSION,
  DEFAULT_HUMIDITY_AXIS,
  DEFAULT_TEMPERATURE_AXIS,
  HUMIDITY_PADDING,
  PADDING_FACTOR,
  TEMPERATURE_PADDING,
  UNAVAILABLE_COLOR,
} from './const';
import {
  averageProfiles,
  evaluatePoint,
  resolveProfile,
  statusKey,
  toNumber,
  type AveragedZone,
} from './comfort';
import { DEFAULT_LAYOUT, renderChart, type ChartPoint, type TrailPoint } from './chart';
import { colorForScore } from './colors';
import { localize } from './localize';
import './editor';

/* eslint-disable no-console */
console.info(
  `%c CLIMATE-COMFORT-CARD %c v${CARD_VERSION} `,
  'color: white; background: #2e9e5b; font-weight: 700;',
  'color: #2e9e5b; background: white; font-weight: 700;',
);
/* eslint-enable no-console */

// Register with the Lovelace card picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: localize('card.name'),
  description: localize('card.description'),
  preview: true,
});

interface ResolvedPoint {
  config: PointConfig;
  profile: ComfortProfile;
  evaluation: PointEvaluation;
  color: string;
}

/** Sentinel key for points without a group, so "Ungrouped" can be hovered too. */
const UNGROUPED = '__ungrouped__';

interface Sample {
  ms: number;
  v: number;
}

/** Parse an HA history series (compressed WS format) into time-sorted samples. */
function parseSeries(raw: unknown[] | undefined): Sample[] {
  if (!Array.isArray(raw)) return [];
  const out: Sample[] = [];
  for (const entry of raw as Record<string, unknown>[]) {
    const state = (entry.s ?? entry.state) as string | undefined;
    const v = Number(state);
    // `lu`/`last_updated` are epoch seconds in the compressed WS format.
    const rawTime = (entry.lu ?? entry.last_updated) as number | undefined;
    if (!Number.isFinite(v) || rawTime === undefined) continue;
    out.push({ ms: rawTime * 1000, v });
  }
  return out;
}

/**
 * Resample two independently-timed series into paired (temperature, humidity)
 * positions over the window, using the last-known value in each time bucket.
 * Consecutive identical positions are collapsed.
 */
function buildTrail(temps: Sample[], hums: Sample[], startMs: number, endMs: number): TrailPoint[] {
  const N = 40;
  const step = (endMs - startMs) / N;
  const pts: TrailPoint[] = [];
  let ti = 0;
  let hi = 0;
  let lastT: number | undefined;
  let lastH: number | undefined;
  for (let k = 0; k <= N; k++) {
    const bucket = startMs + step * k;
    while (ti < temps.length && temps[ti].ms <= bucket) lastT = temps[ti++].v;
    while (hi < hums.length && hums[hi].ms <= bucket) lastH = hums[hi++].v;
    if (lastT === undefined || lastH === undefined) continue;
    const prev = pts[pts.length - 1];
    if (prev && prev.t === lastT && prev.h === lastH) continue;
    pts.push({ t: lastT, h: lastH });
  }
  return pts;
}

@customElement(CARD_NAME)
export class ClimateComfortCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ClimateComfortCardConfig;
  @state() private _hovered: number | null = null;
  /** Point indices hidden via the legend. */
  @state() private _hidden: Set<number> = new Set();
  /** Group whose legend header is hovered (draws the connecting blob). */
  @state() private _hoveredGroup: string | null = null;
  /** Loaded comet trails, keyed by point index. */
  @state() private _trails: Record<number, TrailPoint[]> = {};
  private _trailCache = new Map<string, { points: TrailPoint[]; at: number }>();
  private _trailInflight = new Set<string>();

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(`${CARD_NAME}-editor`) as LovelaceCardEditor;
  }

  public static getStubConfig(): ClimateComfortCardConfig {
    return {
      type: `custom:${CARD_NAME}`,
      title: 'Comfort',
      preset: 'living_room',
      points: [],
    };
  }

  public setConfig(config: ClimateComfortCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = {
      zone_mode: 'auto',
      zone_display: 'always',
      show_legend: true,
      mold_risk: true,
      trail_display: 'hover',
      trail_hours: 24,
      ...config,
      points: config.points ?? [],
    };
    // Config change may alter entities/window; drop any loaded trails.
    this._trails = {};
    this._trailCache.clear();
    this._hidden = new Set();
    this._hoveredGroup = null;
  }

  public getCardSize(): number {
    return 6;
  }

  private get _lang(): string {
    return this.hass?.language ?? 'en';
  }

  private _t(key: string): string {
    return localize(key, this._lang);
  }

  private _resolvePoints(): ResolvedPoint[] {
    if (!this._config || !this.hass) return [];
    return this._config.points.map((point) => {
      const profile = resolveProfile(point, this._config!.preset);
      const temperature = point.temperature
        ? toNumber(this.hass!.states[point.temperature]?.state)
        : undefined;
      const humidity = point.humidity
        ? toNumber(this.hass!.states[point.humidity]?.state)
        : undefined;
      const evaluation = evaluatePoint({
        name: point.name || this._entityFallbackName(point),
        profile,
        temperature,
        humidity,
      });
      const color =
        point.color ??
        (evaluation.unavailable ? UNAVAILABLE_COLOR : colorForScore(evaluation.score));
      return { config: point, profile, evaluation, color };
    });
  }

  private _entityFallbackName(point: PointConfig): string {
    const entity = point.temperature || point.humidity;
    if (entity && this.hass?.states[entity]) {
      return this.hass.states[entity].attributes.friendly_name ?? entity;
    }
    return entity ?? '-';
  }

  private _overallLabel(ev: PointEvaluation): string {
    if (ev.unavailable) return this._t('card.unavailable');
    const issues: string[] = [];
    for (const dim of [ev.temperature, ev.humidity, ev.dewPoint]) {
      if (dim && dim.status !== 'comfortable') {
        const label = this._t(statusKey(dim));
        if (!issues.includes(label)) issues.push(label); // dedupe (e.g. RH-dry + dew-point-dry)
      }
    }
    return issues.length ? issues.join(', ') : this._t('status.comfortable');
  }

  private get _trailHours(): number {
    return this._config?.trail_hours ?? 24;
  }

  private get _prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  /** Which point indices should show a trail, given the display mode. */
  private _neededTrailIndices(resolved: ResolvedPoint[]): number[] {
    const mode = this._config?.trail_display ?? 'hover';
    if (mode === 'off') return [];
    const eligible = (i: number) => {
      const p = this._config!.points[i];
      return !!(p?.temperature && p?.humidity) && !this._hidden.has(i);
    };
    if (mode === 'all') return resolved.map((_, i) => i).filter(eligible);
    return this._hovered !== null && eligible(this._hovered) ? [this._hovered] : [];
  }

  /** Fetch + resample history for the given points into comet trails (cached). */
  private _ensureTrails(indices: number[]): void {
    const hours = this._trailHours;
    for (const index of indices) {
      const key = `${index}|${hours}`;
      if (this._trails[index] || this._trailInflight.has(key)) continue;
      const cached = this._trailCache.get(key);
      if (cached && Date.now() - cached.at < 120_000) {
        this._trails = { ...this._trails, [index]: cached.points };
        continue;
      }
      this._loadTrail(index, hours, key);
    }
  }

  private async _loadTrail(index: number, hours: number, key: string): Promise<void> {
    const point = this._config?.points[index];
    if (!point?.temperature || !point.humidity || !this.hass) return;
    this._trailInflight.add(key);
    const end = new Date();
    const start = new Date(end.getTime() - hours * 3_600_000);
    try {
      const hist = (await this.hass.callWS({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [point.temperature, point.humidity],
        minimal_response: true,
        no_attributes: true,
      })) as Record<string, unknown[]>;
      const points = buildTrail(
        parseSeries(hist[point.temperature]),
        parseSeries(hist[point.humidity]),
        start.getTime(),
        end.getTime(),
      );
      this._trailCache.set(key, { points, at: Date.now() });
      this._trails = { ...this._trails, [index]: points };
    } catch {
      /* history unavailable; leave this point without a trail */
    } finally {
      this._trailInflight.delete(key);
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (
      changed.has('_config') ||
      changed.has('_hovered') ||
      changed.has('_trails') ||
      changed.has('_hidden') ||
      changed.has('_hoveredGroup')
    )
      return true;
    if (!this._config) return false;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old) return true;
    // Re-render only when a referenced entity actually changed state.
    return this._config.points.some((p) =>
      [p.temperature, p.humidity].some(
        (e) => e && old.states[e] !== this.hass!.states[e],
      ),
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const resolved = this._resolvePoints();
    const { tempAxis, humAxis } = this._computeAxes(resolved);

    const chartPoints: ChartPoint[] = resolved
      .map((rp, index): ChartPoint | null => {
        const { evaluation } = rp;
        if (evaluation.unavailable || this._hidden.has(index)) return null;
        const hasTemp = evaluation.temperature !== undefined;
        const hasHum = evaluation.humidity !== undefined;
        const pin = hasTemp && hasHum ? 'none' : hasTemp ? 'x-axis' : 'y-axis';
        return { index, eval: evaluation, color: rp.color, pin };
      })
      .filter((p): p is ChartPoint => p !== null);

    const hoveredResolved =
      this._hovered !== null ? resolved[this._hovered] : undefined;
    const zones = this._zones(resolved, hoveredResolved);

    const needed = this._neededTrailIndices(resolved);
    this._ensureTrails(needed);
    const trails = needed
      .filter((i) => this._trails[i]?.length > 1)
      .map((i) => ({ points: this._trails[i], color: resolved[i].color }));

    return html`
      <ha-card .header=${this._config.title}>
        <div class="ccc-body">
          <div class="ccc-chart-wrap">
            ${renderChart({
              layout: DEFAULT_LAYOUT,
              tempAxis,
              humAxis,
              points: chartPoints,
              zone: zones.zone,
              zoneFaint: zones.faint,
              highlightZone: zones.highlightZone,
              trails,
              animateTrails: !this._prefersReducedMotion,
              groupHull: this._groupHull(resolved),
              hoveredIndex: this._hovered,
              labels: { x: this._t('axis.temperature'), y: this._t('axis.humidity') },
              moldRisk: this._config.mold_risk !== false,
              onHover: (i) => (this._hovered = i),
              onSelect: (i) => (this._hovered = i),
            })}
            ${hoveredResolved ? this._renderTooltip(hoveredResolved) : nothing}
          </div>
          ${resolved.length === 0
            ? html`<div class="ccc-empty">${this._t('card.no_points')}</div>`
            : this._config.show_legend
              ? this._renderLegend(resolved)
              : nothing}
        </div>
      </ha-card>
    `;
  }

  /** Fit each axis to the plotted values (± padding), unless overridden in config. */
  private _computeAxes(resolved: ResolvedPoint[]): { tempAxis: Range; humAxis: Range } {
    const temps: number[] = [];
    const hums: number[] = [];
    resolved.forEach((rp, i) => {
      if (rp.evaluation.unavailable || rp.config.include_in_scale === false || this._hidden.has(i))
        return;
      if (rp.evaluation.temperature) temps.push(rp.evaluation.temperature.value);
      if (rp.evaluation.humidity) hums.push(rp.evaluation.humidity.value);
    });
    return {
      tempAxis:
        this._config!.temperature_axis ??
        this._autoRange(temps, TEMPERATURE_PADDING, DEFAULT_TEMPERATURE_AXIS),
      humAxis:
        this._config!.humidity_axis ??
        this._autoRange(hums, HUMIDITY_PADDING, DEFAULT_HUMIDITY_AXIS, 0, 100),
    };
  }

  /**
   * Fit an axis to `values` with padding proportional to their spread
   * (PADDING_FACTOR × spread), clamped to [pad.min, pad.max] on each side.
   */
  private _autoRange(
    values: number[],
    pad: { min: number; max: number },
    fallback: Range,
    clampMin = -Infinity,
    clampMax = Infinity,
  ): Range {
    if (values.length === 0) return fallback;
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const p = Math.min(pad.max, Math.max(pad.min, (hi - lo) * PADDING_FACTOR));
    return {
      min: Math.max(clampMin, lo - p),
      max: Math.min(clampMax, hi + p),
    };
  }

  /**
   * Decide what comfort geometry to draw, honouring zone_mode + zone_display:
   *  - `zone`          : the persistent aggregate field (only when "always")
   *  - `highlightZone` : the hovered point's own zone (soft fill + outline)
   */
  private _zones(
    resolved: ResolvedPoint[],
    hovered: ResolvedPoint | undefined,
  ): { zone?: AveragedZone; faint: boolean; highlightZone?: ComfortProfile } {
    const display = this._config?.zone_display ?? 'always';
    if (this._config?.zone_mode === 'hidden' || display === 'hidden') {
      return { faint: false };
    }

    let highlightZone: ComfortProfile | undefined;
    if (hovered && !hovered.evaluation.unavailable) {
      const p = hovered.profile;
      if (p.temperature || p.humidity) highlightZone = p;
    }

    if (display === 'hover') {
      // No persistent field; the hovered point's zone carries the visual.
      return { faint: false, highlightZone };
    }

    const profiles = resolved
      .filter((rp, i) => !rp.evaluation.unavailable && !this._hidden.has(i))
      .map((rp) => rp.profile)
      .filter((p) => p.temperature || p.humidity);
    const zone = profiles.length ? averageProfiles(profiles) : undefined;
    const faint = !!zone && this._config?.zone_mode !== 'average' && !zone.uniform;
    return { zone, faint, highlightZone };
  }

  private _renderTooltip(rp: ResolvedPoint): TemplateResult {
    const { evaluation } = rp;
    const row = (e: DimensionEvaluation | undefined, unit: string, prefix?: string) => {
      if (!e) return nothing;
      return html`<div class="ccc-tt-row">
        <span class="ccc-swatch" style=${`background:${colorForScore(e.score)}`}></span>
        <span
          >${prefix ? html`<span class="ccc-tt-dim">${prefix}</span> ` : nothing}${e.value}${unit}</span
        >
        <span class="ccc-tt-status">${this._t(statusKey(e))}</span>
      </div>`;
    };
    return html`<div class="ccc-tooltip">
      <div class="ccc-tt-name">${evaluation.name}</div>
      ${row(evaluation.temperature, '°C')}
      ${row(evaluation.humidity, '%')}
      ${row(evaluation.dewPoint, '°C', this._t('label.dew_point'))}
    </div>`;
  }

  /** Group members, indexed, whose entities give a 2D position (for the hull). */
  private _groupHull(resolved: ResolvedPoint[]): TrailPoint[] | undefined {
    if (this._hoveredGroup === null) return undefined;
    const pts: TrailPoint[] = [];
    resolved.forEach((rp, i) => {
      if ((rp.config.group ?? UNGROUPED) !== this._hoveredGroup || this._hidden.has(i)) return;
      const t = rp.evaluation.temperature?.value;
      const h = rp.evaluation.humidity?.value;
      if (t !== undefined && h !== undefined) pts.push({ t, h });
    });
    return pts.length > 1 ? pts : undefined;
  }

  private _toggleHidden(index: number): void {
    const next = new Set(this._hidden);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._hidden = next;
  }

  private _toggleGroup(indices: number[]): void {
    const anyVisible = indices.some((i) => !this._hidden.has(i));
    const next = new Set(this._hidden);
    for (const i of indices) {
      if (anyVisible) next.add(i);
      else next.delete(i);
    }
    this._hidden = next;
  }

  private _renderBadge(rp: ResolvedPoint, index: number): TemplateResult {
    const hidden = this._hidden.has(index);
    const label = this._overallLabel(rp.evaluation);
    const groupHover =
      this._hoveredGroup !== null && (rp.config.group ?? UNGROUPED) === this._hoveredGroup;
    return html`<button
      type="button"
      class="ccc-badge ${this._hovered === index ? 'is-hovered' : ''} ${
        groupHover ? 'is-grouphover' : ''
      } ${hidden ? 'is-off' : ''} ${rp.evaluation.unavailable ? 'is-unavailable' : ''}"
      title=${`${rp.evaluation.name} - ${label}`}
      @mouseenter=${() => (this._hovered = index)}
      @mouseleave=${() => (this._hovered = null)}
      @focus=${() => (this._hovered = index)}
      @blur=${() => (this._hovered = null)}
      @click=${() => this._toggleHidden(index)}
    >
      <span
        class="ccc-swatch"
        style=${`background:${hidden ? 'var(--disabled-text-color, #9e9e9e)' : rp.color}`}
      ></span>
      <span class="ccc-badge-name">${rp.evaluation.name}</span>
    </button>`;
  }

  private _renderLegend(resolved: ResolvedPoint[]): TemplateResult {
    const hasGroups = resolved.some((rp) => rp.config.group);
    if (!hasGroups) {
      return html`<div class="ccc-legend">
        ${resolved.map((rp, i) => this._renderBadge(rp, i))}
      </div>`;
    }

    // Preserve first-appearance order of groups; undefined group goes last.
    const order: (string | undefined)[] = [];
    const byGroup = new Map<string | undefined, number[]>();
    resolved.forEach((rp, i) => {
      const g = rp.config.group;
      if (!byGroup.has(g)) {
        byGroup.set(g, []);
        order.push(g);
      }
      byGroup.get(g)!.push(i);
    });

    // One continuous wrapping row; group headers act as inline separators so
    // groups flow together instead of each starting a new line.
    return html`<div class="ccc-legend">
      ${order.flatMap((g) => {
        const indices = byGroup.get(g)!;
        const visible = indices.filter((i) => !this._hidden.has(i)).length;
        return [
          html`<button
            type="button"
            class="ccc-group-head ${visible === 0 ? 'is-off' : ''}"
            @click=${() => this._toggleGroup(indices)}
            @mouseenter=${() => (this._hoveredGroup = g ?? UNGROUPED)}
            @mouseleave=${() => (this._hoveredGroup = null)}
          >
            <span class="ccc-group-name">${g ?? this._t('legend.ungrouped')}</span>
            <span class="ccc-group-count">${visible}/${indices.length}</span>
          </button>`,
          ...indices.map((i) => this._renderBadge(resolved[i], i)),
        ];
      })}
    </div>`;
  }

  static styles = css`
    ha-card {
      overflow: hidden;
    }
    .ccc-body {
      padding: 8px 12px 12px;
    }
    .ccc-chart-wrap {
      position: relative;
      width: 100%;
    }
    .ccc-chart {
      width: 100%;
      height: auto;
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .ccc-grid line {
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 0.5;
      opacity: 0.6;
    }
    .ccc-axis {
      stroke: var(--secondary-text-color, #888);
      stroke-width: 1;
    }
    .ccc-tick-label text {
      fill: var(--secondary-text-color, #888);
      font-size: 9px;
    }
    .ccc-axis-title {
      fill: var(--primary-text-color, #333);
      font-size: 10px;
      font-weight: 500;
    }
    .ccc-playhead {
      animation-name: ccc-run;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      will-change: offset-distance;
    }
    @keyframes ccc-run {
      from {
        offset-distance: 0%;
      }
      to {
        offset-distance: 100%;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .ccc-playhead {
        display: none;
      }
    }
    .ccc-point {
      cursor: pointer;
      outline: none;
      transition: r 0.1s ease;
    }
    .ccc-point circle {
      transition: r 0.1s ease;
    }
    .ccc-tooltip {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 8px 10px;
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
      font-size: 12px;
      pointer-events: none;
      min-width: 120px;
    }
    .ccc-tt-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .ccc-tt-row {
      display: flex;
      align-items: center;
      gap: 6px;
      line-height: 1.6;
    }
    .ccc-tt-status {
      margin-left: auto;
      color: var(--secondary-text-color, #888);
    }
    .ccc-tt-dim {
      color: var(--secondary-text-color, #888);
    }
    .ccc-legend {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 6px;
    }
    .ccc-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      padding: 4px 10px 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-family: inherit;
      font-size: 12.5px;
      line-height: 1.2;
      cursor: pointer;
      transition: background 0.1s ease, border-color 0.1s ease;
    }
    .ccc-badge:hover,
    .ccc-badge.is-hovered {
      background: var(--secondary-background-color, #f0f0f0);
      border-color: var(--primary-color, #03a9f4);
    }
    .ccc-badge.is-unavailable {
      opacity: 0.6;
      font-style: italic;
    }
    .ccc-badge.is-grouphover {
      background: var(--secondary-background-color, #f0f0f0);
      border-color: var(--primary-color, #03a9f4);
    }
    .ccc-badge.is-off {
      opacity: 0.45;
    }
    .ccc-badge.is-off .ccc-badge-name {
      text-decoration: line-through;
    }
    .ccc-group-head {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      margin-left: 4px;
      padding: 2px 2px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #888);
      font: inherit;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .ccc-group-head:first-child {
      margin-left: 0;
    }
    .ccc-group-head:hover {
      color: var(--primary-text-color, #333);
    }
    .ccc-group-head.is-off {
      opacity: 0.5;
    }
    .ccc-group-count {
      font-weight: 500;
      letter-spacing: 0;
      opacity: 0.8;
    }
    .ccc-badge-name {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ccc-swatch {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex: 0 0 auto;
    }
    .ccc-empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color, #888);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: ClimateComfortCard;
  }
}
