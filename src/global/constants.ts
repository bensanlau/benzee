export const NUMBER_OF_ROLLS: number = 3;
export const NUMBER_OF_DICE: number = 5;
export const LOWER_TOTAL: number = 63;
export const LOWER_BONUS: number = 35;

import { CategoryItem } from "../components/category/category";
export const BOARD: CategoryItem[] = [
  {
    id: 'one',
    label: '1',
    score: null,
    played: false,
    value: 1,
    bonus: false,
  },
  {
    id: 'two',
    label: '2',
    score: null,
    played: false,
    value: 2,
    bonus: false,
  },
  {
    id: 'three',
    label: '3',
    score: null,
    played: false,
    value: 3,
    bonus: false,
  },
  {
    id: 'four',
    label: '4',
    score: null,
    played: false,
    value: 4,
    bonus: false,
  },
  {
    id: 'five',
    label: '5',
    score: null,
    played: false,
    value: 5,bonus: false,
  },
  {
    id: 'six',
    label: '6',
    score: null,
    played: false,
    value: 6,
    bonus: false,
  },
  {
    id: 'three-kind',
    label: '3x',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'four-kind',
    label: '4x',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'fh',
    label: 'full house',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'sm-st',
    label: 'small straight',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'lg-st',
    label: 'large straight',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'benzee',
    label: 'benzee',
    score: null,
    played: false,
    bonus: false,
  },
  {
    id: 'chance',
    label: '?',
    score: null,
    played: false,
    bonus: false,
  },
]
