import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { gameStore } from '../../store/store';

export interface CategoryItem {
  id: string;
  label: string;
  score: number;
  played: boolean;
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
        </label>
      </Host>
    );
  }

}
