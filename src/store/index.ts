import boardStore from "./board";
import diceStore from "./dice";

const store = {
  board: boardStore(),
  dice: diceStore(),
}

// export type Store = typeof store;

export default store;
