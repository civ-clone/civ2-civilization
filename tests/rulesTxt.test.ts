import { expect } from 'chai';
import { join } from 'path';
import leaderRows from '../data/leaders';
import { readFileSync } from 'fs';
import { readLeaders } from '@civ-clone/civ2-asset-extractor/rules';

// Compares the committed @LEADERS numbers with the player's own RULES.TXT. Skipped unless `CIV2_PATH` names the game's
//  folder, so CI, which has no copy of the game, never runs it. Only numbers are compared.
const path = process.env.CIV2_PATH;

(path ? describe : describe.skip)('RULES.TXT', (): void => {
  it("@LEADERS: each tribe's colour set and attitudes match its row", (): void => {
    const leaders = readLeaders(
      readFileSync(join(path!, 'RULES.TXT'), 'latin1')
    );

    expect(leaders).length(21);

    leaderRows.forEach(({ row, colour, attack, expand, civilize }) => {
      const { colour: c, attack: a, expand: e, civilize: z } = leaders[row - 1];

      expect([colour, attack, expand, civilize], `row ${row}`).eql([
        c,
        a,
        e,
        z,
      ]);
    });
  });
});
