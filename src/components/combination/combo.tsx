import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { diceStore, gameStore } from '../../store/store';

export interface ComboItem {
  id: string;
  label: string;
  score: number;
  played: boolean;
  bonus: boolean;
  value?: number;
  description: string;
}

@Component({
  tag: 'bz-combo',
  styleUrl: 'combo.css',
  scoped: true,
})
export class Combination {
  @Prop() item: ComboItem;
  @Prop() disabled: boolean;
  @State() score: number;
  @Element() combo: HTMLElement;

  @Event() selectScore: EventEmitter<string>;
  handleSelectScore() {
    if (!this.item.played) {
      this.selectScore.emit(this.item.id);
    }
  }

  componentWillLoad() {
    this.combo.style.setProperty('--grid-position', `${this.item.id}`);
  }

  renderBonusBadge() {
    const hasBadge = (this.item.bonus) ||
      (gameStore.get('benzeed') && !this.item.played && Object.keys(diceStore.get('duplicates')).length === 1);

    if (hasBadge) {
      return (<span>+50</span>);
    }
  }

  render() {
    const { label, score, played, description } = this.item;

    return (
      <Host>
        <div class="combo">
          <div class="label">{label}</div>
          <input type="radio" name="combo"
            disabled={!gameStore.get('roundstart') || played}
            checked={gameStore.get('roundstart') ? false : null}
            id={label.replace(' ', '-')}
            value={label.replace(' ', '-')}
            onChange={() => this.handleSelectScore()}
            class={ played ? 'played' : '' }
            />
          <label htmlFor={label.replace(' ', '-')}>
            {score}
            {this.renderBonusBadge()}
          </label>
          <span>
            {description}
          </span>
        </div>
      </Host>
    );
  }

}
