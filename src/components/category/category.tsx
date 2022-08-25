import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { diceStore, gameStore } from '../../store/store';

export interface CategoryItem {
  id: string;
  label: string;
  score: number;
  played: boolean;
  bonus: boolean;
  value?: number;
}

@Component({
  tag: 'bz-category',
  styleUrl: 'category.css',
  scoped: true,
})
export class Category {
  @Prop() item: CategoryItem;
  @Prop() disabled: boolean;
  @State() score: number;
  @Element() category: HTMLElement;

  @Event() selectScore: EventEmitter<string>;
  handleSelectScore() {
    if (!this.item.played) {
      this.selectScore.emit(this.item.id);
    }
  }

  componentWillLoad() {
    this.category.style.setProperty('--grid-position', `${this.item.id}`);
  }

  renderBonusBadge() {
    const hasBadge = (this.item.bonus) ||
      (gameStore.get('benzeed') && !this.item.played && Object.keys(diceStore.get('duplicates')).length === 1);

    if (hasBadge) {
      return (<span>+50</span>);
    }
  }

  render() {
    const { label, score, played } = this.item;

    return (
      <Host>
        <div>{label}</div>
        <input type="radio" name="score"
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
      </Host>
    );
  }

}
