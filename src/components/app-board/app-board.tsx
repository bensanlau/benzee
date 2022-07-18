import { Component, h, State, Listen } from '@stencil/core';

interface DieItem {
  value: number;
  locked: boolean;
}

const NUMBER_OF_TURNS: number = 3;
const NUMBER_OF_DICE: number = 5;

function generateNumber() {
  return 1 + Math.floor(Math.random() * 6);
}

// type Dice = [DieItem, DieItem, DieItem, DieItem, DieItem];

@Component({
  tag: 'app-board',
  styleUrl: 'app-board.css',
  shadow: true,
})
export class AppBoard {
  @State() turns: number = NUMBER_OF_TURNS;
  @State() dice: DieItem[] = [];
  @State() rolled: boolean = false;
  @State() scoreSelected: boolean = false;

  @Listen('scoreSelected')
  handleScoreSelect(){
    this.scoreSelected = true;
  }

  roll() {
    const dice = [];
    for(let i=0; i<NUMBER_OF_DICE; i++) {
      dice.push({
        value: generateNumber(),
        locked: false,
      })
    }
    this.dice = dice;
    this.turns = this.turns - 1;

    this.rolled = true;
  }

  play() {
    this.turns = NUMBER_OF_TURNS;
    this.scoreSelected = false;
    this.rolled = false;
  }

  render() {
    return (
      <div>
        <header>
          <h1>{0}</h1>
          <em>Player name</em>
        </header>

        <main>
          <app-scores
            rolled={this.rolled}
          />

          <footer>
            <div class="dice">
              {this.dice.map((die: DieItem) =>
                <div class="die">
                  {die.value}
                </div>
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
