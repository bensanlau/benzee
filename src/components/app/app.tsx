import { Component, h, Host, State } from '@stencil/core';
import { gameStore, boardStore, diceStore } from '../../store/store';

@Component({
  tag: 'bz-app',
  styleUrl: 'app.css',
  shadow: true,
})
export class App {
  @State() name: string;

  componentWillLoad() {
    const data = JSON.parse(localStorage.getItem('bz-data'));
    if (data) {
      Object.entries(gameStore.state).map((d: any) => {
        const target = d[0];
        gameStore.set(target, data.game.state[target]);
      });

      Object.entries(boardStore.state).map((d: any) => {
        const target = d[0];
        boardStore.set(target, data.board.state[target]);
      });

      Object.entries(diceStore.state).map((d: any) => {
        const target = d[0];
        diceStore.set(target, data.dice.state[target]);
      });
    }

    gameStore.onChange('name', () => {
      this.name = gameStore.get('name');
    });
  }

  componentWillRender() {
    this.name = gameStore.get('name');
  }

  render() {
    return (
      <Host>
        {!this.name ? (
          <bz-name/>
        ) : (
          <bz-game />
        )}
      </Host>
    )
  }
}
