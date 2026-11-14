import Leader from '@civ-clone/core-civilization/Leader';
export type LeaderRow = {
  row: number;
  Leader: typeof Leader;
  colour: number;
  attack: number;
  expand: number;
  civilize: number;
};
export declare const leaderRows: LeaderRow[];
export default leaderRows;
