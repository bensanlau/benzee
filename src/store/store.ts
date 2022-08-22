import { createStore } from "@stencil/store";
import { DieItem } from "../components/die/die";

import { NUMBER_OF_DICE, NUMBER_OF_ROLLS, BOARD } from '../global/constants';

const UNROLLED_DIE: DieItem = {
  value: null,
  locked: false,
}

export const gameStore = createStore({
  name: null,
  roundstart: false,
  bonus_added: false,
  benzeed: false,
  godmode: false,
  rolls: NUMBER_OF_ROLLS,
  points: 0,
  lower_points: 0,
});

export const boardStore = createStore({
  board: BOARD,
});

export const diceStore = createStore({
  dice: new Array(NUMBER_OF_DICE).fill(UNROLLED_DIE),
  duplicates: [],
});
