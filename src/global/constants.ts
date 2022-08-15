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
  },
  {
    id: 'two',
    label: '2',
    score: null,
    played: false,
    value: 2,
  },
  {
    id: 'three',
    label: '3',
    score: null,
    played: false,
    value: 3,
  },
  {
    id: 'four',
    label: '4',
    score: null,
    played: false,
    value: 4,
  },
  {
    id: 'five',
    label: '5',
    score: null,
    played: false,
    value: 5,
  },
  {
    id: 'six',
    label: '6',
    score: null,
    played: false,
    value: 6,
  },
  {
    id: 'three-kind',
    label: '3x',
    score: null,
    played: false,
  },
  {
    id: 'four-kind',
    label: '4x',
    score: null,
    played: false,
  },
  {
    id: 'fh',
    label: 'full house',
    score: null,
    played: false,
  },
  {
    id: 'sm-st',
    label: 'small straight',
    score: null,
    played: false,
  },
  {
    id: 'lg-st',
    label: 'large straight',
    score: null,
    played: false,
  },
  {
    id: 'benzee',
    label: 'benzee',
    score: null,
    played: false,
  },
  {
    id: 'chance',
    label: '?',
    score: null,
    played: false,
  },
]
