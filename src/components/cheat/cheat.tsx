import { Component, h, Listen, Host, Event, EventEmitter } from '@stencil/core';
import { gameStore } from '../../store/store';
import { KONAMI } from '../../global/constants';

let keyCounter = 0;

@Component({
  tag: 'bz-cheat',
  styleUrl: 'cheat.css',
  shadow: true,
})
export class Cheat {
  @Event() enableCheats: EventEmitter<string>
  handleEmitCheat() {
    this.enableCheats.emit();
  }

  @Listen('keyup', {target: 'window'})
  handleKeyUp(ev: KeyboardEvent) {
    if (!gameStore.get('sv_cheats')) {
      keyCounter = ev.key.toLowerCase() === KONAMI[keyCounter].toLowerCase() ? keyCounter + 1 : 0;
      if (keyCounter === KONAMI.length) {
        gameStore.set('sv_cheats', true);
        this.handleEmitCheat();
      }
    }
  }

  handleGod() {
    gameStore.set('godmode', !gameStore.get('godmode'));
  }

  render() {
    return (
      <Host>
        {gameStore.get('sv_cheats') ? (
          <div class="godmode">
            <input id="godmode" type="checkbox"
              checked={gameStore.get('godmode')}
              onChange={() => this.handleGod()}
            />
            <label htmlFor="godmode">God mode</label>
          </div>
        ) : null }
      </Host>
    )
  }
}
