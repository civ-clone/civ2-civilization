import {
  AbrahamLincoln,
  AlexanderTheGreat,
  Brennus,
  CatherineTheGreat,
  ElizabethI,
  FrederickTheGreat,
  GenghisKhan,
  Hammurabi,
  HannibalBarca,
  IsabellaI,
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
  XerxesI,
} from '../Leaders';
import Leader from '@civ-clone/core-civilization/Leader';

// Civilization II's tribes, as RULES.TXT's @LEADERS rows give them (OpenCiv2 `src/auto/civ.cpp` `rules_load_govts_leaders`, and
//  `rules_load_leader_from_table` for the built-in rules, richardpenman/civ2@49f26ec), all 21, each from its own `base-civilization-*` package. Numbers only:
//
//  - `row`: the tribe's row in @LEADERS, from 1.
//  - `colour`: the colour set, 1 to 7. Three tribes share each, and only one of them plays in a game.
//  - `attack`, `expand`, `civilize`: the leader's attitudes, each -1, 0 or 1: rational to aggressive, perfectionist to
//    expansionist and militaristic to civilized.
//  - `cityStyle`: how its cities are drawn, 0 to 3 (the four city styles of CITIES.GIF).
//
// The leader is the existing class nearest to Civ2's: the one it names (male or female), or another of the tribe's.
export type LeaderRow = {
  row: number;
  Leader: typeof Leader;
  colour: number;
  attack: number;
  expand: number;
  civilize: number;
  cityStyle: number;
};

export const leaderRows: LeaderRow[] = [
  {
    row: 1,
    cityStyle: 1,
    Leader: JuliusCaesar,
    colour: 1,
    attack: 0,
    expand: 1,
    civilize: 1,
  },
  {
    row: 2,
    cityStyle: 0,
    Leader: Hammurabi,
    colour: 2,
    attack: -1,
    expand: -1,
    civilize: 1,
  },
  {
    row: 3,
    cityStyle: 3,
    Leader: FrederickTheGreat,
    colour: 3,
    attack: 1,
    expand: -1,
    civilize: 1,
  },
  {
    row: 4,
    cityStyle: 0,
    Leader: RamessesII,
    colour: 4,
    attack: 0,
    expand: 0,
    civilize: 1,
  },
  {
    row: 5,
    cityStyle: 1,
    Leader: AbrahamLincoln,
    colour: 5,
    attack: -1,
    expand: 0,
    civilize: 1,
  },
  {
    row: 6,
    cityStyle: 1,
    Leader: AlexanderTheGreat,
    colour: 6,
    attack: 0,
    expand: 1,
    civilize: -1,
  },
  {
    row: 7,
    cityStyle: 2,
    Leader: MahatmaGandhi,
    colour: 7,
    attack: -1,
    expand: -1,
    civilize: 0,
  },
  {
    row: 8,
    cityStyle: 3,
    Leader: CatherineTheGreat,
    colour: 1,
    attack: 1,
    expand: 0,
    civilize: -1,
  },
  {
    row: 9,
    cityStyle: 0,
    Leader: Shaka,
    colour: 2,
    attack: 1,
    expand: 0,
    civilize: 0,
  },
  {
    row: 10,
    cityStyle: 3,
    Leader: NapoleonI,
    colour: 3,
    attack: 1,
    expand: 1,
    civilize: 1,
  },
  {
    row: 11,
    cityStyle: 0,
    Leader: MoctezumaII,
    colour: 4,
    attack: 0,
    expand: -1,
    civilize: 1,
  },
  {
    row: 12,
    cityStyle: 2,
    Leader: MaoZedong,
    colour: 5,
    attack: 0,
    expand: 0,
    civilize: 1,
  },
  {
    row: 13,
    cityStyle: 3,
    Leader: ElizabethI,
    colour: 6,
    attack: 0,
    expand: 1,
    civilize: 0,
  },
  {
    row: 14,
    cityStyle: 0,
    Leader: GenghisKhan,
    colour: 7,
    attack: 1,
    expand: 1,
    civilize: -1,
  },
  {
    row: 15,
    cityStyle: 0,
    Leader: Brennus,
    colour: 1,
    attack: -1,
    expand: 1,
    civilize: 0,
  },
  {
    row: 16,
    cityStyle: 2,
    Leader: TokugawaIeyasu,
    colour: 2,
    attack: 1,
    expand: -1,
    civilize: -1,
  },
  {
    row: 17,
    cityStyle: 3,
    Leader: RagnarLodbrok,
    colour: 3,
    attack: 1,
    expand: 1,
    civilize: 0,
  },
  {
    row: 18,
    cityStyle: 3,
    Leader: IsabellaI,
    colour: 4,
    attack: -1,
    expand: 1,
    civilize: -1,
  },
  {
    row: 19,
    cityStyle: 0,
    Leader: XerxesI,
    colour: 5,
    attack: 0,
    expand: -1,
    civilize: 0,
  },
  {
    row: 20,
    cityStyle: 1,
    Leader: HannibalBarca,
    colour: 6,
    attack: 0,
    expand: 0,
    civilize: -1,
  },
  {
    row: 21,
    cityStyle: 0,
    Leader: SittingBull,
    colour: 7,
    attack: 0,
    expand: 0,
    civilize: 0,
  },
];

export default leaderRows;
