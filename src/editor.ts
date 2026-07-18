import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

import type { ClimateComfortCardConfig, PointConfig, ZoneMode } from './types';
import { EDITOR_NAME } from './const';
import { PRESETS } from './presets';
import { localize } from './localize';

const ZONE_MODES: ZoneMode[] = ['auto', 'average', 'hidden'];

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

  private _presetItems(includeDefault: boolean): TemplateResult[] {
    const items = PRESETS.map(
      (p) => html`<mwc-list-item value=${p.id}>${this._t(p.labelKey)}</mwc-list-item>`,
    );
    if (includeDefault) {
      items.unshift(html`<mwc-list-item value="">${this._t('editor.use_default')}</mwc-list-item>`);
    }
    return items;
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

        <ha-select
          label=${this._t('editor.default_preset')}
          .value=${this._config.preset ?? ''}
          @selected=${(e: CustomEvent) =>
            this._updateRoot({ preset: (e.target as any).value || undefined })}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${this._presetItems(false)}
        </ha-select>

        <ha-select
          label=${this._t('editor.zone_mode')}
          .value=${this._config.zone_mode ?? 'auto'}
          @selected=${(e: CustomEvent) =>
            this._updateRoot({ zone_mode: (e.target as any).value as ZoneMode })}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${ZONE_MODES.map(
            (m) => html`<mwc-list-item value=${m}>${this._t(`editor.zone_mode.${m}`)}</mwc-list-item>`,
          )}
        </ha-select>

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

  private _renderPointEditor(point: PointConfig, index: number): TemplateResult {
    return html`
      <div class="ccc-point-editor">
        <div class="ccc-point-header">
          <ha-textfield
            class="grow"
            label=${this._t('editor.point_name')}
            .value=${point.name ?? ''}
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

        <ha-select
          label=${this._t('editor.point_preset')}
          .value=${point.preset ?? ''}
          @selected=${(e: CustomEvent) =>
            this._updatePoint(index, { preset: (e.target as any).value || undefined })}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${this._presetItems(true)}
        </ha-select>
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_NAME]: ClimateComfortCardEditor;
  }
}
