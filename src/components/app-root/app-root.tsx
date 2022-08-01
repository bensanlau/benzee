import { Component, h, State, Listen } from '@stencil/core';
import store from '../../store';
import { NUMBER_OF_ROLLS } from '../../global/constants';
import { DieItem } from '../die/die';

function generateNumber() {
  return 1 + Math.floor(Math.random() * 6);
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() score: number = 0;
  @State() rolls: number = NUMBER_OF_ROLLS;
  @State() dice: DieItem[];
  @State() scoreSelected: boolean;
  
  componentWillLoad() {
    this.dice = store.dice.dice;
  }

  @Listen('selectScore')
  handleSelectScore(){
    this.scoreSelected = true;
  }

  roll() {
    this.dice = store.dice.dice;
    this.dice = this.dice.map((die: DieItem) => {
      return {
        value: die.locked ? die.value : generateNumber(),
        locked: die.locked,
      }
    });
    store.dice.setDice(this.dice);
    this.rolls = this.rolls - 1;
    store.board.startRound();
  }

  reset() {
    this.rolls = NUMBER_OF_ROLLS;
    this.scoreSelected = false;
    store.board.endRound();
    store.dice.resetDice();
  }

  play() {
    this.reset();
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.score}</h1>
          <em>Player name</em>
        </header>

        <main>
          <app-board />

          <footer>
            <div class="dice">
              {this.dice.map((die: DieItem, index) =>
                <app-die die={die} position={index} />
              )}
            </div>

            <button
              onClick={() => this.roll()}
              disabled={this.rolls === 0}
            >
              Roll ({this.rolls})
            </button>
            <button
              disabled={!this.scoreSelected}
              onClick={() => this.play()}>
              Play
            </button>
          </footer>
        </main>
      </div>
    );
  }
}
