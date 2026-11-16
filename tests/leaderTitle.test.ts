import Anarchy from '@civ-clone/base-government-anarchy/Anarchy';
import Communism from '@civ-clone/base-government-communism/Communism';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Democracy from '@civ-clone/base-government-democracy/Democracy';
import Despotism from '@civ-clone/base-government-despotism/Despotism';
import Fundamentalism from '@civ-clone/base-government-fundamentalism/Fundamentalism';
import { AbrahamLincoln } from '../Leaders';
import Monarchy from '@civ-clone/base-government-monarchy/Monarchy';
import Republic from '@civ-clone/base-government-republic/Republic';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';
import getRules from '../Rules/Leader/title';
import leaderTitle from '@civ-clone/core-civilization/leaderTitle';

describe('LeaderTitle', (): void => {
  const ruleRegistry = new RuleRegistry(),
    leader = new AbrahamLincoln();

  ruleRegistry.register(...getRules());

  (
    [
      [Anarchy, 'LeaderTitle.civ2.Anarchy'],
      [Despotism, 'LeaderTitle.civ2.Despotism'],
      [Monarchy, 'LeaderTitle.civ2.Monarchy'],
      [Communism, 'LeaderTitle.civ2.Communism'],
      [Fundamentalism, 'LeaderTitle.civ2.Fundamentalism'],
      [Republic, 'LeaderTitle.civ2.Republic'],
      [Democracy, 'LeaderTitle.civ2.Democracy'],
    ] as [new () => DataObject, string][]
  ).forEach(([GovernmentType, key]) =>
    it(`calls a leader under ${GovernmentType.name} by the key ${key}`, (): void => {
      expect(leaderTitle(leader, new GovernmentType(), ruleRegistry)).to.equal(
        key
      );
    })
  );

  it('gives no title under a government Civilization II does not have', (): void => {
    class Theocracy extends DataObject {}

    expect(leaderTitle(leader, new Theocracy(), ruleRegistry)).to.equal(
      undefined
    );
  });
});
