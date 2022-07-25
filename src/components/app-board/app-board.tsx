import { Component, h, State, Listen } from '@stencil/core';

const NUMBER_OF_TURNS: number = 3;
const NUMBER_OF_DICE: number = 5;
const UNROLLED_DIE: DieItem = {
  value: null,
  locked: false,
}

function generateNumber() {
  return 1 + Math.floor(Math.random() * 6);
}
export interface DieItem {
  value: number;
  locked: boolean;
}

@Component({
  tag: 'app-board',
  styleUrl: 'app-board.css',
  shadow: true,
})
export class AppBoard {
  @State() total: number = 0;
  @State() turns: number = NUMBER_OF_TURNS;
  @State() dice: DieItem[] = new Array(NUMBER_OF_DICE).fill(UNROLLED_DIE);
  @State() rolled: boolean = false;
  @State() scoreSelected: boolean = false;

  @Listen('scoreSelected')
  handleScoreSelect(){
    this.scoreSelected = true;
  }

  @Listen('lockDie')
  handleLockDie(event: CustomEvent){
    const { position, locked } = event.detail;
    const dice = this.dice;
    dice[position].locked = !locked;
    this.dice = [];
    this.dice = dice;
  }

  roll() {
    this.dice = this.dice.map(() => ({
      value: generateNumber(),
      locked: false,
    }));

    this.turns = this.turns - 1;
    this.rolled = true;
  }

  lockDie(event: Event) {
    console.log(event);
  }

  reset() {
    this.turns = NUMBER_OF_TURNS;
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
          <app-scores
            rolled={this.rolled}
          />

          <footer>
            <div class="dice">
              {this.dice.map((die: DieItem, index) =>
                <app-die
                  value={die.value}
                  locked={die.locked}
                  position={index}
                />
              )}
            </div>

            <button
              onClick={() => this.roll()}
              disabled={this.turns === 0}
            >
              Roll ({this.turns})
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
