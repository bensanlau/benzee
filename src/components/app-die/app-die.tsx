import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-die',
  styleUrl: 'app-die.css',
  shadow: true,
})
export class AppDie {
  @Prop() position: number;
  @Prop() locked: boolean;
  @Prop() value: number;

  @Event() lockDie: EventEmitter<object>;
  handleLockDie(position: number, locked: boolean) {
    this.lockDie.emit({
      position: position,
      locked: locked,
    });
  }

  handleLocking(value: number, position: number, locked: boolean) {
    if (value) {
      this.handleLockDie(position, locked);
    }
  }
  
  render() {
    const { position } = this;
    const { value, locked } = this;

    return (
      <div class={`die ${locked ? 'die--locked' : ''}`}
        onClick={() => this.handleLocking(value, position, locked)}
      >
        { value }
      </div>
    );
  }

}
