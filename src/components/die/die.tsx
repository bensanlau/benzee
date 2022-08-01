import { Component, h, Prop } from '@stencil/core';
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
  @Prop({ mutable: true }) locked: boolean;

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
