import { Component, h, State } from '@stencil/core';
import { gameStore } from '../../store/store';

@Component({
  tag: 'bz-name',
  styleUrl: 'name.css',
  shadow: true,
})
export class Name {
  @State() name: string;

  handleSubmit(e: any) {
    e.preventDefault();
    gameStore.set('name', this.name);
  }

  handleChange(e: any) {
    this.name = e.target.value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="name">Enter your name</label>
        <input id="name" type="text" onInput={(e) => this.handleChange(e)} required />
        <input type="submit" value="Play" />
      </form>
    )
  }
}
