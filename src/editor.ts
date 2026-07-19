import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

import type {
  ClimateComfortCardConfig,
  ComfortProfile,
  CustomPreset,
  PointConfig,
  TrailDisplay,
  ZoneDisplay,
} from './types';
import { DEFAULT_DEWPOINT, EDITOR_NAME } from './const';
import { PRESETS, getPresetProfile } from './presets';
import { resolveProfile } from './comfort';
import { localize } from './localize';

type BandDim = 'temperature' | 'humidity' | 'dewPoint';

const ZONE_DISPLAYS: ZoneDisplay[] = ['always', 'hover', 'hidden'];
const TRAIL_DISPLAYS: TrailDisplay[] = ['all', 'hover', 'off'];

const ICON_UP = 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z';
const ICON_DOWN = 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z';
const ICON_DELETE =
  'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z';

@customElement(EDITOR_NAME)
export class ClimateComfortCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ClimateComfortCardConfig;
  /** Index of the currently expanded point (accordion), or null when all collapsed. */
  @state() private _expanded: number | null = null;
  /** Index of the currently expanded custom preset (accordion). */
  @state() private _expandedPreset: number | null = null;

  public setConfig(config: ClimateComfortCardConfig): void {
    this._config = { ...config, points: config.points ?? [] };
  }

  private get _lang(): string {
    return this.hass?.language ?? 'en';
  }

  private _t(key: string): string {
    return localize(key, this._lang);
  }

  private _emit(config: ClimateComfortCardConfig): void {
    this._config = config;
    fireEvent(this, 'config-changed', { config });
  }

  private _updateRoot(patch: Partial<ClimateComfortCardConfig>): void {
    if (!this._config) return;
    this._emit({ ...this._config, ...patch });
  }

  private _updatePoint(index: number, patch: Partial<PointConfig>): void {
    if (!this._config) return;
    const points = this._config.points.map((p, i) => (i === index ? { ...p, ...patch } : p));
    this._emit({ ...this._config, points });
  }

  private _addPoint(): void {
    if (!this._config) return;
    const points = [...this._config.points, {} as PointConfig];
    this._expanded = points.length - 1;
    this._emit({ ...this._config, points });
  }

  private _removePoint(index: number): void {
    if (!this._config) return;
    const points = this._config.points.filter((_, i) => i !== index);
    if (this._expanded === index) this._expanded = null;
    else if (this._expanded !== null && this._expanded > index) this._expanded -= 1;
    this._emit({ ...this._config, points });
  }

  private _movePoint(index: number, delta: number): void {
    if (!this._config) return;
    const target = index + delta;
    if (target < 0 || target >= this._config.points.length) return;
    const points = [...this._config.points];
    [points[index], points[target]] = [points[target], points[index]];
    if (this._expanded === index) this._expanded = target;
    else if (this._expanded === target) this._expanded = index;
    this._emit({ ...this._config, points });
  }

  // ---- custom presets (card level) ----

  private get _customPresets(): CustomPreset[] {
    return this._config?.custom_presets ?? [];
  }

  private _addCustomPreset(): void {
    if (!this._config) return;
    const existing = new Set(this._customPresets.map((p) => p.name));
    let n = this._customPresets.length + 1;
    let name = `Preset ${n}`;
    while (existing.has(name)) name = `Preset ${++n}`;
    const base = getPresetProfile('general')!;
    const preset: CustomPreset = {
      name,
      temperature: { preferred: { ...base.temperature!.preferred }, acceptable: { ...base.temperature!.acceptable } },
      humidity: { preferred: { ...base.humidity!.preferred }, acceptable: { ...base.humidity!.acceptable } },
    };
    this._expandedPreset = this._customPresets.length;
    this._updateRoot({ custom_presets: [...this._customPresets, preset] });
  }

  private _removeCustomPreset(index: number): void {
    if (this._expandedPreset === index) this._expandedPreset = null;
    else if (this._expandedPreset !== null && this._expandedPreset > index) this._expandedPreset -= 1;
    this._updateRoot({ custom_presets: this._customPresets.filter((_, i) => i !== index) });
  }

  private _renameCustomPreset(index: number, newName: string): void {
    if (!this._config) return;
    const old = this._customPresets[index]?.name;
    const custom_presets = this._customPresets.map((p, i) => (i === index ? { ...p, name: newName } : p));
    // Keep points and the card default that referenced the old name in sync.
    const points = this._config.points.map((p) => (p.preset === old ? { ...p, preset: newName } : p));
    const preset = this._config.preset === old ? newName : this._config.preset;
    this._emit({ ...this._config, custom_presets, points, preset });
  }

  private _updateCustomPresetProfile(index: number, profile: ComfortProfile): void {
    const custom_presets = this._customPresets.map((p, i) =>
      i === index
        ? { name: p.name, temperature: profile.temperature, humidity: profile.humidity, dewPoint: profile.dewPoint }
        : p,
    );
    this._updateRoot({ custom_presets });
  }

  // ---- shared bits ----

  private _presetOptions(): { id: string; label: string; icon: string }[] {
    return [
      ...PRESETS.map((p) => ({ id: p.id, label: this._t(p.labelKey), icon: p.icon })),
      ...this._customPresets
        .filter((p) => p.name)
        .map((p) => ({ id: p.name, label: p.name, icon: 'mdi:tune-variant' })),
    ];
  }

  /** HA's own button, the same element the edit-card dialog uses for its actions. */
  private _button(label: string, onClick: () => void): TemplateResult {
    return html`<ha-button class="ccc-add" raised @click=${onClick}>${label}</ha-button>`;
  }

  private _renderRangeHint(profile: ComfortProfile): TemplateResult | typeof nothing {
    const parts: string[] = [];
    const t = profile.temperature?.acceptable;
    const h = profile.humidity?.acceptable;
    if (t) parts.push(`🌡 ${t.min}–${t.max} °C`);
    if (h) parts.push(`💧 ${h.min}–${h.max} %`);
    if (parts.length === 0) return nothing;
    return html`<div class="ccc-range-hint">${parts.join('   ·   ')}</div>`;
  }

  /** Generic min/max band editor over a ComfortProfile (point custom + card presets),
   *  built from native ha-form number fields laid out per dimension. */
  private _renderBandGrid(profile: ComfortProfile, onChange: (p: ComfortProfile) => void): TemplateResult {
    const hasDew = !!profile.dewPoint;
    const toggleDew = (on: boolean) => {
      const c: any = JSON.parse(JSON.stringify(profile));
      if (on)
        c.dewPoint = {
          preferred: { ...DEFAULT_DEWPOINT.preferred },
          acceptable: { ...DEFAULT_DEWPOINT.acceptable },
        };
      else delete c.dewPoint;
      onChange(c);
    };
    return html`
      ${this._bandForm(profile, 'temperature', 'editor.custom_temp', onChange)}
      ${this._bandForm(profile, 'humidity', 'editor.custom_hum', onChange)}
      ${hasDew ? this._bandForm(profile, 'dewPoint', 'editor.custom_dew', onChange) : nothing}
      ${this._toggle(this._t('editor.custom_advanced'), hasDew, toggleDew)}
    `;
  }

  private _bandForm(
    profile: ComfortProfile,
    dim: BandDim,
    labelKey: string,
    onChange: (p: ComfortProfile) => void,
  ): TemplateResult {
    const b = (profile as any)[dim] ?? { preferred: { min: 0, max: 0 }, acceptable: { min: 0, max: 0 } };
    const data = { pmin: b.preferred.min, pmax: b.preferred.max, amin: b.acceptable.min, amax: b.acceptable.max };
    const num = { number: { mode: 'box' } };
    const schema = [
      {
        name: dim,
        type: 'grid',
        schema: [
          { name: 'pmin', selector: num },
          { name: 'pmax', selector: num },
          { name: 'amin', selector: num },
          { name: 'amax', selector: num },
        ],
      },
    ];
    const labels: Record<string, string> = {
      pmin: this._t('editor.pref_min'),
      pmax: this._t('editor.pref_max'),
      amin: this._t('editor.acc_min'),
      amax: this._t('editor.acc_max'),
    };
    return html`
      <div class="ccc-band-label">${this._t(labelKey)}</div>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: { name: string }) => labels[s.name] ?? ''}
        @value-changed=${(e: CustomEvent) => {
          const v = e.detail.value;
          const c: any = JSON.parse(JSON.stringify(profile));
          c[dim] = {
            preferred: { min: Number(v.pmin), max: Number(v.pmax) },
            acceptable: { min: Number(v.amin), max: Number(v.amax) },
          };
          onChange(c);
        }}
      ></ha-form>
    `;
  }

  private _toggle(
    label: string,
    checked: boolean,
    onChange: (v: boolean) => void,
    helper?: string,
  ): TemplateResult {
    return this._formField({
      name: 'v',
      selector: { boolean: {} },
      label,
      value: checked,
      helper,
      onChange: (v) => onChange(!!v),
    });
  }

  /** A single native HA field via ha-form (always available inside the edit dialog). */
  private _formField(opts: {
    name: string;
    selector: unknown;
    label: string;
    value: unknown;
    helper?: string;
    onChange: (value: unknown) => void;
  }): TemplateResult {
    return html`<ha-form
      .hass=${this.hass}
      .data=${{ [opts.name]: opts.value }}
      .schema=${[{ name: opts.name, selector: opts.selector }]}
      .computeLabel=${() => opts.label}
      .computeHelper=${() => opts.helper ?? ''}
      @value-changed=${(e: CustomEvent) => opts.onChange(e.detail.value[opts.name])}
    ></ha-form>`;
  }

  private _textField(opts: {
    label: string;
    value: string;
    helper?: string;
    onInput: (value: string) => void;
  }): TemplateResult {
    return this._formField({
      name: 'v',
      selector: { text: {} },
      label: opts.label,
      value: opts.value,
      helper: opts.helper,
      onChange: (v) => opts.onInput((v as string) ?? ''),
    });
  }

  /** Native HA dropdown via ha-form's select selector. */
  private _select(opts: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    helper?: string;
    onChange: (value: string) => void;
  }): TemplateResult {
    return this._formField({
      name: 'v',
      selector: { select: { mode: 'dropdown', options: opts.options } },
      label: opts.label,
      value: opts.value,
      helper: opts.helper,
      onChange: (v) => opts.onChange((v as string) ?? ''),
    });
  }

  private _defaultName(point: PointConfig): string {
    const entity = point.temperature || point.humidity;
    if (entity && this.hass?.states[entity]) {
      return this.hass.states[entity].attributes.friendly_name ?? entity;
    }
    return entity ?? '';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    return html`
      <div class="ccc-editor">
        ${this._textField({
          label: this._t('editor.title'),
          value: this._config.title ?? '',
          onInput: (v) => this._updateRoot({ title: v || undefined }),
        })}

        ${this._select({
          label: this._t('editor.default_preset'),
          value: this._config.preset ?? '',
          options: this._presetOptions().map((o) => ({ value: o.id, label: o.label })),
          onChange: (v) => this._updateRoot({ preset: v || undefined }),
        })}

        ${this._renderCustomPresets()}

        ${this._select({
          label: this._t('editor.zones'),
          value: this._config.zone_display ?? 'always',
          options: ZONE_DISPLAYS.map((id) => ({ value: id, label: this._t(`editor.zones.${id}`) })),
          onChange: (v) => this._updateRoot({ zone_display: v as ZoneDisplay }),
        })}

        ${this._select({
          label: this._t('editor.trail'),
          value: this._config.trail_display ?? 'hover',
          options: TRAIL_DISPLAYS.map((id) => ({ value: id, label: this._t(`editor.trail.${id}`) })),
          onChange: (v) => this._updateRoot({ trail_display: v as TrailDisplay }),
        })}

        ${(this._config.trail_display ?? 'hover') !== 'off'
          ? this._formField({
              name: 'hours',
              selector: { number: { min: 1, max: 240, mode: 'box' } },
              label: this._t('editor.trail_hours'),
              value: this._config.trail_hours ?? 24,
              onChange: (v) => {
                const n = Number(v);
                this._updateRoot({ trail_hours: Number.isFinite(n) && n > 0 ? n : undefined });
              },
            })
          : nothing}

        ${this._toggle(this._t('editor.show_legend'), this._config.show_legend !== false, (v) =>
          this._updateRoot({ show_legend: v }),
        )}
        ${this._toggle(
          this._t('editor.mold_risk'),
          this._config.mold_risk !== false,
          (v) => this._updateRoot({ mold_risk: v }),
          this._t('editor.mold_help'),
        )}

        <div class="ccc-section-title">${this._t('editor.points')}</div>
        ${this._config.points.map((point, index) => this._renderPointEditor(point, index))}

        ${this._button(this._t('editor.add_point'), () => this._addPoint())}
      </div>
    `;
  }

  private _renderCustomPresets(): TemplateResult {
    return html`
      <div class="ccc-section-title">${this._t('editor.custom_presets')}</div>
      ${this._customPresets.map((cp, i) => this._renderPresetAccordion(cp, i))}
      ${this._button(this._t('editor.add_custom_preset'), () => this._addCustomPreset())}
    `;
  }

  private _renderPresetAccordion(cp: CustomPreset, i: number): TemplateResult {
    const title = cp.name || `Preset ${i + 1}`;
    return html`
      <ha-expansion-panel
        .outlined=${true}
        .leftChevron=${true}
        .expanded=${this._expandedPreset === i}
        @expanded-changed=${(e: CustomEvent) => (this._expandedPreset = e.detail.expanded ? i : null)}
      >
        <div slot="header" class="ccc-head">
          <span class="ccc-head-title">${title}</span>
          <div class="ccc-head-tools" @click=${(e: Event) => e.stopPropagation()}>
            <ha-icon-button
              .path=${ICON_DELETE}
              title=${this._t('editor.remove')}
              @click=${() => this._removeCustomPreset(i)}
            ></ha-icon-button>
          </div>
        </div>
        <div class="ccc-body">
          ${this._textField({
            label: this._t('editor.preset_name'),
            value: cp.name,
            onInput: (v) => this._renameCustomPreset(i, v),
          })}
          ${this._renderBandGrid(
            { temperature: cp.temperature, humidity: cp.humidity, dewPoint: cp.dewPoint },
            (p) => this._updateCustomPresetProfile(i, p),
          )}
        </div>
      </ha-expansion-panel>
    `;
  }

  private _renderPointEditor(point: PointConfig, index: number): TemplateResult {
    const title = point.name || this._defaultName(point) || `${this._t('editor.point')} ${index + 1}`;
    const last = this._config!.points.length - 1;
    return html`
      <ha-expansion-panel
        .outlined=${true}
        .leftChevron=${true}
        .expanded=${this._expanded === index}
        @expanded-changed=${(e: CustomEvent) => (this._expanded = e.detail.expanded ? index : null)}
      >
        <div slot="header" class="ccc-head">
          <span class="ccc-head-title">${title}</span>
          <div class="ccc-head-tools" @click=${(e: Event) => e.stopPropagation()}>
            <ha-icon-button
              .path=${ICON_UP}
              .disabled=${index === 0}
              title=${this._t('editor.move_up')}
              @click=${() => this._movePoint(index, -1)}
            ></ha-icon-button>
            <ha-icon-button
              .path=${ICON_DOWN}
              .disabled=${index === last}
              title=${this._t('editor.move_down')}
              @click=${() => this._movePoint(index, 1)}
            ></ha-icon-button>
            <ha-icon-button
              .path=${ICON_DELETE}
              title=${this._t('editor.remove')}
              @click=${() => this._removePoint(index)}
            ></ha-icon-button>
          </div>
        </div>
        ${this._renderPointBody(point, index)}
      </ha-expansion-panel>
    `;
  }

  private _renderPointBody(point: PointConfig, index: number): TemplateResult {
    return html`
      <div class="ccc-body">
        <ha-entity-picker
          label=${this._t('editor.temperature_entity')}
          .hass=${this.hass}
          .value=${point.temperature ?? ''}
          .includeDomains=${['sensor', 'climate', 'number', 'input_number']}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updatePoint(index, { temperature: e.detail.value || undefined })}
        ></ha-entity-picker>

        <ha-entity-picker
          label=${this._t('editor.humidity_entity')}
          .hass=${this.hass}
          .value=${point.humidity ?? ''}
          .includeDomains=${['sensor', 'number', 'input_number']}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updatePoint(index, { humidity: e.detail.value || undefined })}
        ></ha-entity-picker>

        ${this._textField({
          label: this._t('editor.point_name'),
          value: point.name ?? '',
          helper: this._defaultName(point)
            ? `${this._t('editor.point_name_helper')} (${this._defaultName(point)})`
            : this._t('editor.point_name_helper'),
          onInput: (v) => this._updatePoint(index, { name: v || undefined }),
        })}
        ${this._textField({
          label: this._t('editor.point_group'),
          value: point.group ?? '',
          onInput: (v) => this._updatePoint(index, { group: v || undefined }),
        })}

        ${this._toggle(this._t('editor.reference'), !!point.reference, (v) =>
          this._updatePoint(index, { reference: v || undefined }),
        )}
        ${point.reference
          ? nothing
          : html`
              ${this._select({
                label: this._t('editor.point_preset'),
                value: point.comfort ? '' : point.preset ?? '',
                options: [
                  { value: '', label: this._t('editor.use_default') },
                  ...this._presetOptions().map((o) => ({ value: o.id, label: o.label })),
                ],
                onChange: (v) => this._updatePoint(index, { preset: v || undefined, comfort: undefined }),
              })}
              ${this._renderRangeHint(resolveProfile(point, this._config!))}
            `}
        ${this._toggle(this._t('editor.include_in_scale'), point.include_in_scale !== false, (v) =>
          this._updatePoint(index, { include_in_scale: v ? undefined : false }),
        )}
      </div>
    `;
  }

  static styles = css`
    .ccc-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-entity-picker,
    ha-form {
      display: block;
      width: 100%;
    }
    ha-button.ccc-add {
      align-self: flex-start;
      margin-top: 4px;
    }
    .ccc-section-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin: 8px 0 2px;
      padding-top: 14px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .ccc-head {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
    }
    .ccc-head-title {
      flex: 1;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ccc-head-tools {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
    }
    .ccc-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 4px;
    }
    .ccc-band-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-top: 4px;
    }
    .ccc-range-hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_NAME]: ClimateComfortCardEditor;
  }
}
