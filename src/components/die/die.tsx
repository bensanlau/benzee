import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { DieItem } from '../app-root/app-root';

@Component({
  tag: 'app-die',
  styleUrl: 'die.css',
  shadow: true,
})
export class Die {
  @Prop() position: number;
  @Prop() die: DieItem;
  @Prop({ mutable: true }) locked: boolean;

  // @Event() lockDie: EventEmitter<object>;
  @Event() lockDie: EventEmitter;
  handleLockDie(value: number, position: number, locked: boolean) {
    if (value) {
      this.locked = locked;

      this.lockDie.emit({
        position: position,
        locked: locked,
      });
    }
  }

  componentWillLoad() {
    this.locked = this.die.locked;
  }
  
  render() {
    const { position, locked } = this;
    const { value } = this.die;

    return (
      <div class={`die ${locked ? 'die--locked' : ''}`}
        onClick={() => this.handleLockDie(value, position, !locked)}
      >
        { value } 
      </div>
    );
  }

}
