import { Component, h, State, Listen, Event, EventEmitter } from '@stencil/core';
import { diceStore, boardStore, gameStore } from '../../store/store';
import { NUMBER_OF_ROLLS, LOWER_TOTAL, LOWER_BONUS } from '../../global/constants';
import { DieItem } from '../die/die';
import { ComboItem } from '../combination/combo';

const generateNumber = () => {
  return 1 + Math.floor(Math.random() * 6);
}

@Component({
  tag: 'bz-game',
  styleUrl: 'game.css',
  shadow: true,
})
export class Game {
  @State() scoreSelected: string;

  @Listen('selectScore')
  handleSelectScore(score: CustomEvent){
    this.scoreSelected = score.detail;
  }

  @Listen('enableCheats')
  handleCheatListen() {
    this.saveToLocal();
  }

  @Event() emitPlay: EventEmitter<string>;
  handleEmitPlay() {
    this.emitPlay.emit();
  }

  roll(): void {
    diceStore.set('dice', diceStore.get('dice').map((die: DieItem) => ({
      ...die,
      value: gameStore.get('godmode') ? 6 : die.locked ? die.value : generateNumber(),
    })))

    boardStore.set('board', boardStore.get('board').map((combo: ComboItem) => ({ 
      ...combo,
      score: !combo.played ? this.calculateScore(combo) : combo.score,
    })));

    gameStore.set('roundstart', true);
    gameStore.set('rolls', gameStore.get('rolls') - 1);
  }

  reset(): void {
    this.scoreSelected = null;
    gameStore.set('rolls', NUMBER_OF_ROLLS);
    gameStore.set('roundstart', false);
    diceStore.reset();
    boardStore.set('board', boardStore.get('board').map((combo: ComboItem) => {
      return {
        ...combo,
        score: !combo.played ? null : combo.score,
      }
    }));
  }

  play(): void {
    boardStore.set('board', boardStore.get('board').map((combo: ComboItem) => {
      const match = combo.id === this.scoreSelected;
      return { 
        ...combo,
        played: match ? true : combo.played,
        bonus: match && gameStore.get('benzeed') && this.getDuplicates(5) ? true : combo.bonus,
      }
    }));

    const combination = Object.entries(boardStore.get('board')).find(item => item[1].id === this.scoreSelected)[1];
    gameStore.set('points', gameStore.get('points') + combination.score);

    if (combination.value) {
      gameStore.set('lower_points', gameStore.get('lower_points') + combination.score);
    }

    if (!gameStore.get('bonus_added') && gameStore.get('lower_points') >= LOWER_TOTAL) {
      gameStore.set('bonus_added', true);
      gameStore.set('points', gameStore.get('points') + LOWER_BONUS);
    }

    if (gameStore.get('benzeed') && this.getDuplicates(5)) {
      gameStore.set('points', gameStore.get('points') + 50);
    }

    if (!gameStore.get('benzeed') && combination.id === 'benzee' && combination.score === 50) {
      gameStore.set('benzeed', true);
    }

    this.handleEmitPlay();
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
      } else {
        tally = 0;
      }
    })

    return tally + 1 >= seqLength;
  }

  calculateScore(combo: ComboItem): number {
    diceStore.set('duplicates', diceStore.get('dice').reduce((acc, {value}) => (
      {...acc, [value]: (acc[value] || 0) + 1}
    ), {}));

    if (gameStore.get('godmode')) {
      switch(combo.id) {
        case 'benzee': return 50;
        case 'chance':
        case 'three-kind':
        case 'four-kind': return 30;
        case 'fh': return 25;
        case 'sm-st': return 30;
        case 'lg-st': return 40;
        default:
          return combo.value * 5;
      }
    }

    switch(combo.id) {
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
        return this.getDuplicatesByValue(combo.value);
    }
  }

  saveToLocal() {
    localStorage.setItem('bz-data', JSON.stringify({
      game: gameStore,
      board: boardStore,
      dice: diceStore,
    }));
  }

  componentDidRender() {
    this.saveToLocal();
  }

  render() {
    return (
      <div>
        <header>
          <h1>{gameStore.get('points')}</h1>
          <em>{gameStore.get('name')}</em>
        </header>

        <main>
          <section>
            {boardStore.get('board').map((combo: ComboItem) =>
              <bz-combo item={combo} />
            )}

            {/*
            <div class="bonus">
              <label>
                Section bonus
                <span>+{LOWER_BONUS}</span>
              </label>
              <div>
                {gameStore.get('lower_points') >= 63 ? (
                  <div>✅ +{LOWER_BONUS}</div>
                ) : (
                  <div><span>{gameStore.get('lower_points')}</span> / {LOWER_TOTAL}</div>
                )}
              </div>
            </div>
                */}
          </section>

          <footer>
            <div class="dice">
              {diceStore.get('dice').map((die: DieItem, index) =>
                <bz-die die={die} index={index} />
              )}
            </div>

            <div class="buttons">
              <button
                class="button button--roll"
                onClick={() => this.roll()}
                disabled={gameStore.get('rolls') === 0}>
                <span>Roll</span>
                <span>{gameStore.get('rolls')}</span>
              </button>

              {this.scoreSelected && (
                <button
                  class="button button--play"
                  disabled={!this.scoreSelected}
                  onClick={() => this.play()}>
                  Play
                </button>
              )}
            </div>
          </footer>
        </main>

        <bz-cheat />
      </div>
    );
  }
}
