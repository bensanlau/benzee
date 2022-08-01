import { createStore } from "@stencil/store";
import { DieItem } from "../components/die/die";
import { NUMBER_OF_DICE } from '../global/constants';

const UNROLLED_DIE: DieItem = {
  value: null,
  locked: false,
}

interface StateType {
  dice: DieItem[]
}

const diceStore = () => {
  const store = createStore<StateType>({
    dice: new Array(NUMBER_OF_DICE).fill(UNROLLED_DIE)
  });

  return {
    get dice() {
      return store.get('dice');
    },

    resetDice() {
      store.reset();
    },

    setDice(dice: DieItem[]) {
      store.set('dice', dice);
    }
  }
}

export default diceStore;
