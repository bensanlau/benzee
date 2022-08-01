import { Component, h, Prop, State } from '@stencil/core';
import store from '../../store';
export interface DieItem {
  value: number;
  locked: boolean;
}

@Component({
  tag: 'app-die',
  styleUrl: 'die.css',
  shadow: true,
})
export class Die {
  @Prop() position: number;
  @Prop() die: DieItem;
  @State() locked: boolean;

  lock() {
    const { die: { value }, locked, position } = this;
    let dice: DieItem[] = store.dice.dice;

    if (value) {
      this.locked = !locked;
      dice = dice.map((die: DieItem, index) => ({
        value: die.value,
        locked: position === index ? !locked : die.locked,
      }));
      store.dice.setDice(dice);
    }
  }

  componentWillUpdate() {
    if (!this.die.value) {
      this.locked = false;
    }
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
