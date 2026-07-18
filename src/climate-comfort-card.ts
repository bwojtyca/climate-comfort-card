import { LitElement, html, css, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

import type {
  ClimateComfortCardConfig,
  ComfortProfile,
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
import { DEFAULT_LAYOUT, renderChart, type ChartPoint } from './chart';
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

@customElement(CARD_NAME)
export class ClimateComfortCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ClimateComfortCardConfig;
  @state() private _hovered: number | null = null;

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
      ...config,
      points: config.points ?? [],
    };
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
    return entity ?? '—';
  }

  private _overallLabel(ev: PointEvaluation): string {
    if (ev.unavailable) return this._t('card.unavailable');
    const issues: string[] = [];
    if (ev.temperature && ev.temperature.status !== 'comfortable') {
      issues.push(this._t(statusKey(ev.temperature)));
    }
    if (ev.humidity && ev.humidity.status !== 'comfortable') {
      issues.push(this._t(statusKey(ev.humidity)));
    }
    return issues.length ? issues.join(', ') : this._t('status.comfortable');
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_hovered')) return true;
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
        if (evaluation.unavailable) return null;
        const hasTemp = evaluation.temperature !== undefined;
        const hasHum = evaluation.humidity !== undefined;
        const pin = hasTemp && hasHum ? 'none' : hasTemp ? 'x-axis' : 'y-axis';
        return { index, eval: evaluation, color: rp.color, pin };
      })
      .filter((p): p is ChartPoint => p !== null);

    const hoveredResolved =
      this._hovered !== null ? resolved[this._hovered] : undefined;
    const zones = this._zones(resolved, hoveredResolved);

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
              hoveredIndex: this._hovered,
              labels: { x: this._t('axis.temperature'), y: this._t('axis.humidity') },
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
    for (const rp of resolved) {
      if (rp.evaluation.unavailable) continue;
      if (rp.evaluation.temperature) temps.push(rp.evaluation.temperature.value);
      if (rp.evaluation.humidity) hums.push(rp.evaluation.humidity.value);
    }
    return {
      tempAxis:
        this._config!.temperature_axis ??
        this._autoRange(temps, TEMPERATURE_PADDING, DEFAULT_TEMPERATURE_AXIS),
      humAxis:
        this._config!.humidity_axis ??
        this._autoRange(hums, HUMIDITY_PADDING, DEFAULT_HUMIDITY_AXIS, 0, 100),
    };
  }

  private _autoRange(
    values: number[],
    pad: number,
    fallback: Range,
    clampMin = -Infinity,
    clampMax = Infinity,
  ): Range {
    if (values.length === 0) return fallback;
    let min = Math.floor(Math.min(...values) - pad);
    let max = Math.ceil(Math.max(...values) + pad);
    if (min === max) {
      min -= pad;
      max += pad;
    }
    return { min: Math.max(clampMin, min), max: Math.min(clampMax, max) };
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
      .filter((rp) => !rp.evaluation.unavailable)
      .map((rp) => rp.profile)
      .filter((p) => p.temperature || p.humidity);
    const zone = profiles.length ? averageProfiles(profiles) : undefined;
    const faint = !!zone && this._config?.zone_mode !== 'average' && !zone.uniform;
    return { zone, faint, highlightZone };
  }

  private _renderTooltip(rp: ResolvedPoint): TemplateResult {
    const { evaluation } = rp;
    const unit = (dim: 'temperature' | 'humidity') => (dim === 'temperature' ? '°C' : '%');
    const row = (dim: 'temperature' | 'humidity') => {
      const e = evaluation[dim];
      if (!e) return nothing;
      return html`<div class="ccc-tt-row">
        <span class="ccc-swatch" style=${`background:${colorForScore(e.score)}`}></span>
        <span>${e.value}${unit(dim)}</span>
        <span class="ccc-tt-status">${this._t(statusKey(e))}</span>
      </div>`;
    };
    return html`<div class="ccc-tooltip">
      <div class="ccc-tt-name">${evaluation.name}</div>
      ${row('temperature')}
      ${row('humidity')}
    </div>`;
  }

  private _renderLegend(resolved: ResolvedPoint[]): TemplateResult {
    return html`<div class="ccc-legend">
      ${resolved.map((rp, index) => {
        const label = this._overallLabel(rp.evaluation);
        return html`<button
          type="button"
          class="ccc-badge ${this._hovered === index ? 'is-hovered' : ''} ${
            rp.evaluation.unavailable ? 'is-unavailable' : ''
          }"
          title=${`${rp.evaluation.name} — ${label}`}
          @mouseenter=${() => (this._hovered = index)}
          @mouseleave=${() => (this._hovered = null)}
          @focus=${() => (this._hovered = index)}
          @blur=${() => (this._hovered = null)}
          @click=${() => (this._hovered = this._hovered === index ? null : index)}
        >
          <span class="ccc-swatch" style=${`background:${rp.color}`}></span>
          <span class="ccc-badge-name">${rp.evaluation.name}</span>
        </button>`;
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
    .ccc-legend {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
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
