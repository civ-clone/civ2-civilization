import { expect } from 'chai';
import { join } from 'path';
import leaderRows from '../data/leaders';
import { readFileSync } from 'fs';
import { readLeaders } from '@civ-clone/civ2-asset-extractor/rules';

// Compares the committed @LEADERS numbers with the player's own RULES.TXT. Skipped unless `CIV2_PATH` names the game's
//  folder, so CI, which has no copy of the game, never runs it. Only numbers are compared.
const path = process.env.CIV2_PATH;

(path ? describe : describe.skip)('RULES.TXT', (): void => {
  it("@LEADERS: each of the 21 tribes' colour set, attitudes and city style match its row", (): void => {
    const leaders = readLeaders(
      readFileSync(join(path!, 'RULES.TXT'), 'latin1')
    );

    expect(leaders).length(21);

    expect(leaderRows.map(({ row }) => row)).eql(
      leaders.map((leader, index) => index + 1)
    );

    leaderRows.forEach(
      ({ row, colour, attack, expand, civilize, cityStyle }) => {
        const {
          colour: c,
          attack: a,
          expand: e,
          civilize: z,
          cityStyle: s,
        } = leaders[row - 1];

        expect([colour, attack, expand, civilize, cityStyle], `row ${row}`).eql(
          [c, a, e, z, s]
        );
      }
    );
  });
});
