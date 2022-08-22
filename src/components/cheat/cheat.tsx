import { Component, h } from '@stencil/core';
import { gameStore } from '../../store/store';

@Component({
  tag: 'bz-cheat',
  styleUrl: 'cheat.css',
  shadow: true,
})
export class Cheat {
  handleGod() {
    gameStore.set('godmode', !gameStore.get('godmode'));
  }

  render() {
    return (
      <div class="godmode">
        <input id="godmode" type="checkbox"
          checked={gameStore.get('godmode')}
          onChange={() => this.handleGod()}
        />
        <label htmlFor="godmode">God mode</label>
      </div>
    )
  }
}
