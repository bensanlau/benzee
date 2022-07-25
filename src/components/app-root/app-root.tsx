import { Component, h, State, Listen } from '@stencil/core';

const NUMBER_OF_ROLLS: number = 3;
const NUMBER_OF_DICE: number = 5;
const UNROLLED_DIE: DieItem = {
  value: null,
  locked: false,
}
const BOARD = [
  '1', '2', '3', '4', '5', '6', 'Bonus', // lower section
  '3x', '4x', 'full house', 'small straight', 'big straight', 'benzee', '?' // upper section
];

function generateNumber() {
  return 1 + Math.floor(Math.random() * 6);
}

export interface DieItem {
  value: number;
  locked: boolean;
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() total: number = 0;
  @State() rolls: number = NUMBER_OF_ROLLS;
  @State() dice: DieItem[] = new Array(NUMBER_OF_DICE).fill(UNROLLED_DIE);
  @State() rolled: boolean = false;
  @State() scoreSelected: boolean = false;

  @Listen('scoreSelected')
  handleScoreSelect(){
    this.scoreSelected = true;
  }

  @Listen('lockDie')
  // handleLockDie(event: CustomEvent<object>){
  handleLockDie(event: CustomEvent){
    const { position, locked } = event.detail;
    this.dice = this.dice.map((die: DieItem, index) => {
      return {
        value: die.value,
        locked: position === index ? locked : die.locked,
      }
    });
  }

  roll() {
    this.dice = this.dice.map((die: DieItem) => {
      return {
        value: die.locked ? die.value : generateNumber(),
        locked: die.locked,
      }
    });

    this.rolls = this.rolls - 1;
    this.rolled = true;
  }

  reset() {
    this.rolls = NUMBER_OF_ROLLS;
    this.scoreSelected = false;
    this.rolled = false;
    this.dice.fill(UNROLLED_DIE);
  }

  play() {
    this.reset();
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.total}</h1>
          <em>Player name</em>
        </header>

        <main>
          <section>
            {BOARD.map((item) =>
              <app-score disabled={!this.rolled} label={item} />
            )}
          </section>

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
