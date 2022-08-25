import { Component, h, Host, Listen, State } from '@stencil/core';
import { gameStore, boardStore, diceStore } from '../../store/store';

@Component({
  tag: 'bz-app',
  styleUrl: 'app.css',
  shadow: true,
})
export class App {
  @State() allPlayed: boolean = false;

  @Listen('emitPlay')
  checkIfAllPlayed() {
    this.allPlayed = boardStore.get('board').map(item => item.played).every(item => item === true);
  }

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

    this.checkIfAllPlayed();
  }

  reset() {
    boardStore.reset();
    diceStore.reset();
    let name = gameStore.get('name');
    gameStore.reset();
    gameStore.set('name', name);

    this.checkIfAllPlayed();
  }

  render() {
    return (
      <Host>
        {this.allPlayed ? (
          <div class="end">
            <h1>{gameStore.get('points')}</h1>
            You have scored {gameStore.get('points')} points!
            
            <button onClick={() => this.reset()}>Play again</button>
          </div>
        ) : (
          gameStore.get('name') ? (
            <bz-game/>
          ) : (
            <bz-name/>
          )
        )}
        
      </Host>
    )
  }
}
