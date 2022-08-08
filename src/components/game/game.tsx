import { Component, h, State, Listen } from '@stencil/core';
import store from '../../store';
import { NUMBER_OF_ROLLS } from '../../global/constants';
import { DieItem } from '../die/die';
import { CategoryItem } from '../category/category';

const generateNumber = () => {
  return 1 + Math.floor(Math.random() * 6);
}

@Component({
  tag: 'bz-game',
  styleUrl: 'game.css',
  shadow: true,
})
export class Game {
  @State() points: number = 0;
  @State() rolls: number = NUMBER_OF_ROLLS;
  @State() dice: DieItem[];
  @State() board: CategoryItem[];
  @State() scoreSelected: string;
  
  componentWillLoad() {
  }

  componentWillRender() {
    this.board = store.board.board;
    this.dice = store.dice.dice;
  }

  @Listen('selectScore')
  handleSelectScore(score: CustomEvent){
    this.scoreSelected = score.detail;
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
    
    this.board = store.board.board;
    this.board = this.board.map((category: CategoryItem) => {
      return {
        id: category.id,
        label: category.label,
        score: !category.played ? this.calculateScore(category.id) : category.score,
        played: category.played,
      };
    });

    store.board.updateBoard(this.board);
  }

  reset() {
    this.rolls = NUMBER_OF_ROLLS;
    this.scoreSelected = null;
    store.board.endRound();
    store.dice.resetDice();
  }

  play() {
    this.board = this.board.map((category: CategoryItem) => {
      if (category.id === this.scoreSelected) {
        this.points = this.points + category.score;
      }

      return {
        id: category.id,
        label: category.label,
        score: category.score,
        played: category.id === this.scoreSelected ? true : category.played,
      }
    });
    store.board.updateBoard(this.board);

    this.reset();
  }

  findDuplicates(numOfDupes: number, exact: boolean = false) {
    const dice = store.dice.dice;
    const count = dice.reduce((acc, {value}) => (
      {...acc, [value]: (acc[value] || 0) + 1}
    ), {});

    if (exact) {
      return Object.values(count).some(item => item === numOfDupes);
    } else {
      return Object.values(count).some(item => item >= numOfDupes);
    }
  }

  findDuplicatesByValue(id: string): number {
    const dice = store.dice.dice;
    const acc = dice.reduce((acc, {value}) => (
      {...acc, [value]: (acc[value] || 0) + 1}
    ), {});
    let value = '';

    switch (id) {
      case 'one':
        value = '1';
        break;
      case 'two':
        value = '2';
        break;
      case 'three':
        value = '3';
        break;
      case 'four':
        value = '4';
        break;
      case 'five':
        value = '5';
        break;
      case 'six':
        value = '6';
        break;
    }

    const dupes = Object.entries(acc).filter(item => item[0] === value);

    if (dupes.length) {
      if (typeof dupes[0][1] === 'number') {
        return dupes[0][1] * parseInt(value);
      }
    } else {
      return 0;
    }
  }

  addUpEverything() {
    const dice = store.dice.dice;
    return Object.values(dice).reduce((acc, {value}) => acc + value, 0);
  }

  calculateScore(id: string) {
    switch(id) {
      case 'benzee':
        return this.findDuplicates(5) ? 50 : 0;
      case 'chance':
        return this.addUpEverything();
      case 'three-of-a-kind':
        return this.findDuplicates(3) ? this.addUpEverything() : 0;
        case 'four-of-a-kind':
          return this.findDuplicates(4) ? this.addUpEverything() : 0;
      case 'full-house':
        const a = this.findDuplicates(3, true);
        const b = this.findDuplicates(2, true);
        return a && b ? 25 : 0;
      case 'small-straight':
        return 1;
      case 'large-straight':
        return 1;
      default:
        return this.findDuplicatesByValue(id);
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.points}</h1>
          <em>Player name</em>
        </header>

        <main>
          <section>
            {this.board.map((item: CategoryItem) =>
              <bz-category item={item} />
            )}

            <div class="bonus">
              <label>
                Section bonus
                <span>+35</span>
              </label>
              <div>
                0 / 63
              </div>
            </div>
          </section>

          <footer>
            <div class="dice">
              {this.dice.map((die: DieItem, index) =>
                <bz-die die={die} index={index} />
              )}
            </div>

            <button
              onClick={() => this.roll()}
              disabled={this.rolls === 0}>
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
