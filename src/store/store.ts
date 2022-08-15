import { createStore } from "@stencil/store";
import { DieItem } from "../components/die/die";

import { NUMBER_OF_DICE, BOARD } from '../global/constants';

const UNROLLED_DIE: DieItem = {
  value: null,
  locked: false,
}

export const gameStore = createStore({
  roundstart: false,
  bonus_added: false,
  benzeed: false,
  godmode: false,
});

export const boardStore = createStore({
  board: BOARD,
});

export const diceStore = createStore({
  dice: new Array(NUMBER_OF_DICE).fill(UNROLLED_DIE),
  duplicates: [],
});

