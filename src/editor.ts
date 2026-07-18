import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

import type {
  ClimateComfortCardConfig,
  ComfortProfile,
  PointConfig,
  PresetId,
  ZoneDisplay,
} from './types';
import { EDITOR_NAME } from './const';
import { PRESETS } from './presets';
import { resolveProfile } from './comfort';
import { localize } from './localize';

const ZONE_DISPLAYS: { id: ZoneDisplay; icon: string }[] = [
  { id: 'always', icon: 'mdi:eye' },
  { id: 'hover', icon: 'mdi:gesture-tap' },
  { id: 'hidden', icon: 'mdi:eye-off' },
];

@customElement(EDITOR_NAME)
export class ClimateComfortCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ClimateComfortCardConfig;

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
    const points = this._config.points.map((p, i) =>
      i === index ? { ...p, ...patch } : p,
    );
    this._emit({ ...this._config, points });
  }

  private _addPoint(): void {
    if (!this._config) return;
    const points = [...this._config.points, {} as PointConfig];
    this._emit({ ...this._config, points });
  }

  private _removePoint(index: number): void {
    if (!this._config) return;
    const points = this._config.points.filter((_, i) => i !== index);
    this._emit({ ...this._config, points });
  }

  /**
   * A deterministic chip row for picking a preset. Avoids the mwc-select
   * initialisation quirk that would fire a spurious empty `selected` event and
   * wipe the chosen preset. `includeDefault` adds a "use the card default" chip.
   */
  private _renderPresetChips(
    activeId: PresetId | undefined,
    includeDefault: boolean,
    onPick: (id: PresetId | undefined) => void,
  ): TemplateResult {
    const chips: TemplateResult[] = [];
    if (includeDefault) {
      chips.push(
        this._chip(
          this._t('editor.use_default'),
          'mdi:home-outline',
          !activeId,
          () => onPick(undefined),
        ),
      );
    }
    for (const p of PRESETS) {
      chips.push(
        this._chip(this._t(p.labelKey), p.icon, activeId === p.id, () => onPick(p.id)),
      );
    }
    return html`<div class="ccc-chips">${chips}</div>`;
  }

  private _chip(
    label: string,
    icon: string,
    active: boolean,
    onClick: () => void,
  ): TemplateResult {
    return html`<button
      type="button"
      class="ccc-chip ${active ? 'is-active' : ''}"
      @click=${onClick}
    >
      <ha-icon icon=${icon}></ha-icon><span>${label}</span>
    </button>`;
  }

  /** Show the effective acceptable ranges of a resolved profile as a hint. */
  private _renderRangeHint(profile: ComfortProfile): TemplateResult | typeof nothing {
    const parts: string[] = [];
    const t = profile.temperature?.acceptable;
    const h = profile.humidity?.acceptable;
    if (t) parts.push(`🌡 ${t.min}–${t.max} °C`);
    if (h) parts.push(`💧 ${h.min}–${h.max} %`);
    if (parts.length === 0) return nothing;
    return html`<div class="ccc-range-hint">${parts.join('   ·   ')}</div>`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    return html`
      <div class="ccc-editor">
        <ha-textfield
          label=${this._t('editor.title')}
          .value=${this._config.title ?? ''}
          @input=${(e: Event) =>
            this._updateRoot({ title: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>

        <div class="ccc-field">
          <div class="ccc-label">${this._t('editor.default_preset')}</div>
          ${this._renderPresetChips(this._config.preset, false, (id) =>
            this._updateRoot({ preset: id }))}
        </div>

        <div class="ccc-field">
          <div class="ccc-label">${this._t('editor.zones')}</div>
          <div class="ccc-chips">
            ${ZONE_DISPLAYS.map(({ id, icon }) =>
              this._chip(
                this._t(`editor.zones.${id}`),
                icon,
                (this._config!.zone_display ?? 'always') === id,
                () => this._updateRoot({ zone_display: id }),
              ),
            )}
          </div>
        </div>

        <ha-formfield label=${this._t('editor.show_legend')}>
          <ha-switch
            .checked=${this._config.show_legend !== false}
            @change=${(e: Event) =>
              this._updateRoot({ show_legend: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>

        <div class="ccc-section-title">${this._t('editor.points')}</div>
        ${this._config.points.map((point, index) => this._renderPointEditor(point, index))}

        <mwc-button raised @click=${this._addPoint}>
          ${this._t('editor.add_point')}
        </mwc-button>
      </div>
    `;
  }

  /** The name the point would show if `name` is left blank (entity friendly
   *  name, which entities may force via their identifiers). Used as placeholder. */
  private _defaultName(point: PointConfig): string {
    const entity = point.temperature || point.humidity;
    if (entity && this.hass?.states[entity]) {
      return this.hass.states[entity].attributes.friendly_name ?? entity;
    }
    return entity ?? '';
  }

  private _renderPointEditor(point: PointConfig, index: number): TemplateResult {
    return html`
      <div class="ccc-point-editor">
        <div class="ccc-point-header">
          <ha-textfield
            class="grow"
            label=${this._t('editor.point_name')}
            .value=${point.name ?? ''}
            .placeholder=${this._defaultName(point)}
            helper=${this._t('editor.point_name_helper')}
            @input=${(e: Event) =>
              this._updatePoint(index, { name: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
          <ha-icon-button
            .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
            title=${this._t('editor.remove')}
            @click=${() => this._removePoint(index)}
          ></ha-icon-button>
        </div>

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

        <div class="ccc-field">
          <div class="ccc-label">${this._t('editor.point_preset')}</div>
          ${this._renderPresetChips(point.preset, true, (id) =>
            this._updatePoint(index, { preset: id }))}
          ${this._renderRangeHint(resolveProfile(point, this._config!.preset))}
        </div>
      </div>
    `;
  }

  static styles = css`
    .ccc-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-textfield,
    ha-select,
    ha-entity-picker {
      width: 100%;
    }
    .ccc-section-title {
      font-weight: 600;
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .ccc-point-editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .ccc-point-header {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ccc-point-header .grow {
      flex: 1;
    }
    .ccc-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ccc-label {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
    .ccc-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .ccc-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 10px 5px 8px;
      border: 1px solid var(--divider-color, #d0d0d0);
      border-radius: 16px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.1s ease, border-color 0.1s ease;
    }
    .ccc-chip:hover {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .ccc-chip.is-active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .ccc-chip ha-icon {
      --mdc-icon-size: 18px;
      width: 18px;
      height: 18px;
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
