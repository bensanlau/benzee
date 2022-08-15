import { Component, h, State, Listen } from '@stencil/core';
import { diceStore, boardStore, gameStore } from '../../store/store';
import { NUMBER_OF_ROLLS, LOWER_TOTAL, LOWER_BONUS } from '../../global/constants';
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
  @State() lowerPoints: number = 0;
  @State() rolls: number = NUMBER_OF_ROLLS;
  @State() scoreSelected: string;

  @Listen('selectScore')
  handleSelectScore(score: CustomEvent){
    this.scoreSelected = score.detail;
  }

  roll(): void {
    diceStore.set('dice', diceStore.get('dice').map((die: DieItem) => ({
      ...die,
      value: gameStore.get('godmode') ? 6 : die.locked ? die.value : generateNumber(),
    })))

    boardStore.set('board', boardStore.get('board').map((category: CategoryItem) => ({ 
      ...category,
      score: !category.played ? this.calculateScore(category) : category.score,
    })));

    gameStore.set('roundstart', true);
    this.rolls = this.rolls - 1;

    console.log(gameStore.get('benzeed'));
    console.log(diceStore.get('duplicates'));
  }

  reset(): void {
    this.rolls = NUMBER_OF_ROLLS;
    this.scoreSelected = null;
    gameStore.set('roundstart', false);
    diceStore.reset();
    boardStore.set('board', boardStore.get('board').map((category: CategoryItem) => {
      return {
        ...category,
        score: !category.played ? null : category.score,
      }
    }));
  }

  play(): void {
    boardStore.set('board', boardStore.get('board').map((category: CategoryItem) => {
      return { 
        ...category,
        played: category.id === this.scoreSelected ? true : category.played,
      }
    }));

    const category = Object.entries(boardStore.get('board')).find(item => item[1].id === this.scoreSelected)[1];
    this.points = this.points + category.score;
    if (category.value) {
      this.lowerPoints = this.lowerPoints + category.score;
    }

    if (!gameStore.get('bonus_added') && this.lowerPoints >= LOWER_TOTAL) {
      gameStore.set('bonus_added', true);
      this.points = this.points + LOWER_BONUS;
    }

    if (!gameStore.get('benzeed') && category.id === 'benzee' && category.score === 50) {
      gameStore.set('benzeed', true);
    }

    this.reset();
  }

  getDuplicates(numOfDupes: number, exact: boolean = false): boolean {
    if (exact) {
      return Object.values(diceStore.get('duplicates')).some(item => item === numOfDupes);
    } else {
      return Object.values(diceStore.get('duplicates')).some(item => item >= numOfDupes);
    }
  }

  getDuplicatesByValue(value: number): number {
    const valueFound = Object.entries(diceStore.get('duplicates')).find((item) => {
      return value === parseInt(item[0]);
    });

    return valueFound ? valueFound[1] * value : 0;
  }

  sum() {
    return Object.values(diceStore.get('dice')).reduce((acc, {value}) => acc + value, 0);
  }

  calculateStraight(seqLength: number): boolean {
    let tally = 0;
    const set = Object.keys(diceStore.get('duplicates')).map(key => parseInt(key));
    set.map((item, index) => {
      if (index + 1 <= set.length) {
        tally += set[index + 1] - item === 1 ? 1 : 0;
      }
    })

    return tally + 1 >= seqLength;
  }

  calculateScore(category: CategoryItem): number {
    diceStore.set('duplicates', diceStore.get('dice').reduce((acc, {value}) => (
      {...acc, [value]: (acc[value] || 0) + 1}
    ), {}));

    if (gameStore.get('godmode')) {
      switch(category.id) {
        case 'benzee': return 50;
        case 'chance':
        case 'three-kind':
        case 'four-kind': return 30;
        case 'fh': return 25;
        case 'sm-st': return 30;
        case 'lg-st': return 40;
        default:
          return category.value * 5;
      }
    }

    switch(category.id) {
      case 'benzee':
        return this.getDuplicates(5) ? 50 : 0;
      case 'chance':
        return this.sum();
      case 'three-kind':
        return this.getDuplicates(3) ? this.sum() : 0;
        case 'four-kind':
          return this.getDuplicates(4) ? this.sum() : 0;
      case 'fh':
        return this.getDuplicates(3, true) && this.getDuplicates(2, true) ? 25 : 0;
      case 'sm-st':
        return this.calculateStraight(4) ? 30 : 0;
        case 'lg-st':
        return this.calculateStraight(5) ? 40 : 0;
      default:
        return this.getDuplicatesByValue(category.value);
    }
  }

  handleGod() {
    gameStore.set('godmode', !gameStore.get('godmode'));
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
            {boardStore.get('board').map((item: CategoryItem) =>
              <bz-category item={item} />
            )}

            <div class="bonus">
              <label>
                Section bonus
                <span>+{LOWER_BONUS}</span>
              </label>
              <div>
                {this.lowerPoints >= 63 ? (
                  <div>✅ +{LOWER_BONUS}</div>
                ) : (
                  <div><span>{this.lowerPoints}</span> / {LOWER_TOTAL}</div>
                )}
              </div>
            </div>
          </section>

          <footer>
            <div class="dice">
              {diceStore.get('dice').map((die: DieItem, index) =>
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

        <div class="godmode">
          <input id="godmode" type="checkbox" onChange={() => this.handleGod()} />
          <label htmlFor="godmode">God mode</label>
        </div>
      </div>
    );
  }
}
