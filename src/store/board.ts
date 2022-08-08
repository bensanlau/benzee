import { createStore } from "@stencil/store";
import { CategoryItem } from '../components/category/category';
// import { ScoreItem } from '../components/scoreboard/category/category';
// import { BOARD } from '../components/board/board';
interface StateType {
  roundStarted: boolean;
  scoreSelected: boolean;
  board: CategoryItem[]
}

export const BOARD = [
  { id: 'one', label: '1', score: 0, played: false,},
  { id: 'two', label: '2', score: 0, played: false,},
  { id: 'three', label: '3', score: 0, played: false,},
  { id: 'four', label: '4', score: 0, played: false,},
  { id: 'five', label: '5', score: 0, played: false,},
  { id: 'six', label: '6', score: 0, played: false,},
  { id: 'three-of-a-kind', label: '3x', score: 0, played: false,},
  { id: 'four-of-a-kind', label: '4x', score: 0, played: false,},
  { id: 'full-house', label: 'full house', score: 0, played: false,},
  { id: 'small-straight', label: 'small straight', score: 0, played: false,},
  { id: 'large-straight', label: 'big straight', score: 0, played: false,},
  { id: 'benzee', label: 'benzee', score: 0, played: false,},
  { id: 'chance', label: '?', score: 0, played: false,},
]

const boardStore = () => {
  const store = createStore<StateType>({
    roundStarted: false,
    scoreSelected: false,
    board: BOARD,
    // board: BOARD.map((item) => {
    //   return {
    //     played: false,
    //     score: 0,
    //     label: item
    //   }
    // })
  });

  return {
    get roundStarted() {
      return store.get('roundStarted');
    },

    startRound() {
      store.set('roundStarted', true);
    },
    
    endRound() {
      store.set('roundStarted', false);
    },

    get board() {
      return store.get('board');
    },

    updateBoard(board: CategoryItem[]) {
      store.set('board', board);
    }
  }
}

export default boardStore;
