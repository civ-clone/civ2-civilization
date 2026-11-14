import {
  AbrahamLincoln,
  AlexanderTheGreat,
  CatherineTheGreat,
  ElizabethI,
  FrederickTheGreat,
  GenghisKhan,
  Hammurabi,
  JuliusCaesar,
  MahatmaGandhi,
  MaoZedong,
  MoctezumaII,
  NapoleonI,
  RagnarLodbrok,
  RamessesII,
  Shaka,
  SittingBull,
  TokugawaIeyasu,
} from '../Leaders';
import Leader from '@civ-clone/core-civilization/Leader';

// Civilization II's tribes, as RULES.TXT's @LEADERS rows give them (OpenCiv2 `src/auto/civ.cpp:1472`, `:1327` for the
//  built-in rules), for the 17 that have a `base-civilization-*` package. Numbers only:
//
//  - `row`: the tribe's row in @LEADERS, from 1. Rows 15 (Celts), 18 (Spanish), 19 (Persians) and 20 (Carthaginians)
//    have no package yet.
//  - `colour`: the colour set, 1 to 7. Three tribes share each, and only one of them plays in a game.
//  - `attack`, `expand`, `civilize`: the leader's attitudes, each -1, 0 or 1: rational to aggressive, perfectionist to
//    expansionist and militaristic to civilized.
//
// The leader is the existing class nearest to Civ2's: the one it names (male or female), or another of the tribe's.
export type LeaderRow = {
  row: number;
  Leader: typeof Leader;
  colour: number;
  attack: number;
  expand: number;
  civilize: number;
};

export const leaderRows: LeaderRow[] = [
  {
    row: 1,
    Leader: JuliusCaesar,
    colour: 1,
    attack: 0,
    expand: 1,
    civilize: 1,
  },
  { row: 2, Leader: Hammurabi, colour: 2, attack: -1, expand: -1, civilize: 1 },
  {
    row: 3,
    Leader: FrederickTheGreat,
    colour: 3,
    attack: 1,
    expand: -1,
    civilize: 1,
  },
  { row: 4, Leader: RamessesII, colour: 4, attack: 0, expand: 0, civilize: 1 },
  {
    row: 5,
    Leader: AbrahamLincoln,
    colour: 5,
    attack: -1,
    expand: 0,
    civilize: 1,
  },
  {
    row: 6,
    Leader: AlexanderTheGreat,
    colour: 6,
    attack: 0,
    expand: 1,
    civilize: -1,
  },
  {
    row: 7,
    Leader: MahatmaGandhi,
    colour: 7,
    attack: -1,
    expand: -1,
    civilize: 0,
  },
  {
    row: 8,
    Leader: CatherineTheGreat,
    colour: 1,
    attack: 1,
    expand: 0,
    civilize: -1,
  },
  { row: 9, Leader: Shaka, colour: 2, attack: 1, expand: 0, civilize: 0 },
  { row: 10, Leader: NapoleonI, colour: 3, attack: 1, expand: 1, civilize: 1 },
  {
    row: 11,
    Leader: MoctezumaII,
    colour: 4,
    attack: 0,
    expand: -1,
    civilize: 1,
  },
  { row: 12, Leader: MaoZedong, colour: 5, attack: 0, expand: 0, civilize: 1 },
  { row: 13, Leader: ElizabethI, colour: 6, attack: 0, expand: 1, civilize: 0 },
  {
    row: 14,
    Leader: GenghisKhan,
    colour: 7,
    attack: 1,
    expand: 1,
    civilize: -1,
  },
  {
    row: 16,
    Leader: TokugawaIeyasu,
    colour: 2,
    attack: 1,
    expand: -1,
    civilize: -1,
  },
  {
    row: 17,
    Leader: RagnarLodbrok,
    colour: 3,
    attack: 1,
    expand: 1,
    civilize: 0,
  },
  {
    row: 21,
    Leader: SittingBull,
    colour: 7,
    attack: 0,
    expand: 0,
    civilize: 0,
  },
];

export default leaderRows;
