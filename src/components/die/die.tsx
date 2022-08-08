import { Component, h, Prop, State } from '@stencil/core';
import store from '../../store';
export interface DieItem {
  value: number;
  locked: boolean;
}

@Component({
  tag: 'bz-die',
  styleUrl: 'die.css',
  shadow: true,
})
export class Die {
  @Prop() index: number;
  @Prop() die: DieItem;
  @State() locked: boolean;

  lock() {
    const { index } = this;
    const { value, locked } = store.dice.dice[index];

    if (value) {
      this.locked = !locked;
      store.dice.dice[index] = {
        value: value,
        locked: !locked,
      }
    }
  }

  componentWillUpdate() {
    this.locked = store.dice.dice[this.index].locked;
  }

  render() {
    const { die: { value }, locked } = this;

    return (
      <div
        class={`die ${locked ? 'die--locked' : ''}`}
        onClick={() => this.lock()}
      >
        { value }
      </div>
    );
  }
}
