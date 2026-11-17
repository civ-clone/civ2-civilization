import * as Leaders from '../Leaders';
import { product, sum } from '@civ-clone/base-leader-personality/lib/combine';
import AttackConfidence from '@civ-clone/base-leader-personality/Rules/Player/AttackConfidence';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Expansion from '@civ-clone/base-leader-personality/Rules/Player/Expansion';
import { Game } from '@civ-clone/core-game';
import Leader from '@civ-clone/core-civilization/Leader';
import MilitaryUnhappinessTolerance from '@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance';
import OverseasSettlers from '@civ-clone/base-leader-personality/Rules/Player/OverseasSettlers';
import Player from '@civ-clone/core-player/Player';
import PollutionConcern from '@civ-clone/base-leader-personality/Rules/Player/PollutionConcern';
import ScienceBias from '@civ-clone/base-leader-personality/Rules/Player/ScienceBias';
import WantedAdvances from '@civ-clone/base-leader-personality/Rules/Player/WantedAdvances';
import { expect } from 'chai';
import register from '../registerRules';
import registerTraits from '../registerTraits';

describe('personality', (): void => {
  const game = new Game();

  registerTraits(game.traits);
  register(game);

  const playerFor = (LeaderType: typeof Leader): Player => {
    const player = new Player(game.rules),
      civilization = new Civilization();

    player.setCivilization(civilization);
    civilization.setLeader(new LeaderType(game.traits));

    return player;
  };

  // Row 14, Genghis Khan: attack 1, expand 1, civilize -1. Row 2, Hammurabi: -1, -1, 1. Row 21, Sitting Bull: 0, 0, 0.
  const genghis = playerFor(Leaders.GenghisKhan),
    hammurabi = playerFor(Leaders.Hammurabi),
    sittingBull = playerFor(Leaders.SittingBull);

  it("leans science and war weariness by the leader's civilize", (): void => {
    expect(
      [genghis, hammurabi, sittingBull].map((player) =>
        sum(game.rules, ScienceBias, player)
      )
    ).eql([-1, 1, 0]);
    expect(
      [genghis, hammurabi, sittingBull].map((player) =>
        sum(game.rules, MilitaryUnhappinessTolerance, player)
      )
    ).eql([-1, 1, 0]);
  });

  it("is keener to attack by the leader's attack, and to expand by its expand", (): void => {
    expect(
      [genghis, hammurabi, sittingBull].map((player) =>
        product(game.rules, AttackConfidence, player, sittingBull)
      )
    ).eql([1.25, 0.9, 1]);
    expect(product(game.rules, Expansion, genghis)).closeTo(
      (5 / 3) * (6 / 7),
      1e-9
    );
    expect(product(game.rules, Expansion, hammurabi)).closeTo(
      (1 / 3) * (6 / 5),
      1e-9
    );
    expect(product(game.rules, Expansion, sittingBull)).equal(1);
    expect(sum(game.rules, OverseasSettlers, genghis)).equal(0.5);
    expect(sum(game.rules, OverseasSettlers, hammurabi)).equal(0);
  });

  it('minds pollution more for a civilized or friendly leader', (): void => {
    expect(product(game.rules, PollutionConcern, hammurabi)).equal(1.5 * 1.25);
    expect(product(game.rules, PollutionConcern, genghis)).equal(0.75 * 0.75);
  });

  it('wants no advance list, so science never stops', (): void => {
    expect(game.rules.process(WantedAdvances, genghis)).eql([]);
  });
});
