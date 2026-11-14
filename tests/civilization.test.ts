import * as Civilizations from '../Civilizations';
import * as Leaders from '../Leaders';
import {
  Aggressive,
  Civilized,
  Expansionist,
  Friendly,
  Militaristic,
  NormalAggression,
  NormalDevelopment,
  NormalMilitarism,
  Perfectionist,
} from '../Traits';
import AttributeRegistry from '@civ-clone/core-civilization/AttributeRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import CivilizationRegistry from '@civ-clone/core-civilization/CivilizationRegistry';
import Leader from '@civ-clone/core-civilization/Leader';
import LeaderRegistry from '@civ-clone/core-civilization/LeaderRegistry';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
import { expect } from 'chai';
import leaderRows from '../data/leaders';
import registerAttributes from '../registerAttributes';
import registerCivilizations from '../registerCivilizations';
import registerLeaders from '../registerLeaders';
import registerTraits from '../registerTraits';

const setUp = () => {
  const attributeRegistry = new AttributeRegistry(),
    civilizationRegistry = new CivilizationRegistry(),
    leaderRegistry = new LeaderRegistry(),
    traitRegistry = new TraitRegistry();

  registerAttributes(attributeRegistry);
  registerCivilizations(civilizationRegistry);
  registerLeaders(leaderRegistry);
  registerTraits(traitRegistry);

  return {
    attributeRegistry,
    civilizationRegistry,
    leaderRegistry,
    traitRegistry,
  };
};

describe('civ2-civilization', (): void => {
  it('registers the 17 Civ2 tribes that have a package, in @LEADERS order', (): void => {
    const { civilizationRegistry } = setUp();

    expect(civilizationRegistry.entries()).length(17);
    expect(
      civilizationRegistry
        .entries()
        .map((CivilizationType) => CivilizationType.name)
    ).eql([
      'Roman',
      'Babylonian',
      'German',
      'Egyptian',
      'American',
      'Greek',
      'Indian',
      'Russian',
      'Zulu',
      'French',
      'Aztec',
      'Chinese',
      'English',
      'Mongol',
      'Japanese',
      'Viking',
      'Sioux',
    ]);
    expect(
      new Set([
        ...civilizationRegistry.entries(),
        ...(Object.values(Civilizations) as unknown as (typeof Civilization)[]),
      ]).size
    ).equal(17);
  });

  it('gives each civilization one leader of its own', (): void => {
    const { civilizationRegistry, leaderRegistry } = setUp();

    expect(leaderRegistry.entries()).length(17);
    expect(
      new Set([
        ...leaderRegistry.entries(),
        ...(Object.values(Leaders) as unknown as (typeof Leader)[]),
      ]).size
    ).equal(17);
    civilizationRegistry
      .entries()
      .forEach((CivilizationType) =>
        expect(
          leaderRegistry.getByCivilization(CivilizationType),
          CivilizationType.name
        ).length(1)
      );
  });

  it('gives each leader one trait of each attitude, from @LEADERS', (): void => {
    const { traitRegistry } = setUp(),
      traitsOf = (LeaderType: typeof Leader) =>
        traitRegistry.getByLeader(LeaderType).map((trait) => trait.constructor);

    leaderRows.forEach(({ Leader }) =>
      expect(traitsOf(Leader), Leader.name).length(3)
    );

    // Row 1: attack 0, expand 1, civilize 1.
    expect(traitsOf(Leaders.JuliusCaesar)).eql([
      NormalAggression,
      Expansionist,
      Civilized,
    ]);
    // Row 2: -1, -1, 1.
    expect(traitsOf(Leaders.Hammurabi)).eql([
      Friendly,
      Perfectionist,
      Civilized,
    ]);
    // Row 14: 1, 1, -1.
    expect(traitsOf(Leaders.GenghisKhan)).eql([
      Aggressive,
      Expansionist,
      Militaristic,
    ]);
    // Row 21: 0, 0, 0.
    expect(traitsOf(Leaders.SittingBull)).eql([
      NormalAggression,
      NormalDevelopment,
      NormalMilitarism,
    ]);
  });

  it('gives each civilization its Civ2 colour set, 1 to 7, the three of a set coming from different rows', (): void => {
    const { attributeRegistry, civilizationRegistry } = setUp(),
      colourOf = (CivilizationType: typeof Civilization) =>
        attributeRegistry
          .getByCivilization(CivilizationType)
          .filter((attribute) => attribute.name() === 'colourSet')
          .map((attribute) => attribute.value());

    civilizationRegistry.entries().forEach((CivilizationType) => {
      const [colour, ...rest] = colourOf(CivilizationType);

      expect(rest, CivilizationType.name).length(0);
      expect(colour).within(1, 7);
    });

    // In @LEADERS, row n has colour ((n - 1) mod 7) + 1.
    leaderRows.forEach(({ row, colour }) =>
      expect(colour, `row ${row}`).equal(((row - 1) % 7) + 1)
    );
  });
});
