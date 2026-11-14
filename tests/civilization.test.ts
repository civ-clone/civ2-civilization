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
import CityNameRegistry from '@civ-clone/core-civilization/CityNameRegistry';
import CivilizationRegistry from '@civ-clone/core-civilization/CivilizationRegistry';
import Leader from '@civ-clone/core-civilization/Leader';
import LeaderRegistry from '@civ-clone/core-civilization/LeaderRegistry';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
import { expect } from 'chai';
import leaderRows from '../data/leaders';
import registerAttributes from '../registerAttributes';
import registerCityNames from '../registerCityNames';
import registerCivilizations from '../registerCivilizations';
import registerLeaders from '../registerLeaders';
import registerTraits from '../registerTraits';

const setUp = () => {
  const attributeRegistry = new AttributeRegistry(),
    cityNameRegistry = new CityNameRegistry(),
    civilizationRegistry = new CivilizationRegistry(),
    leaderRegistry = new LeaderRegistry(),
    traitRegistry = new TraitRegistry();

  registerAttributes(attributeRegistry);
  registerCityNames(cityNameRegistry);
  registerCivilizations(civilizationRegistry);
  registerLeaders(leaderRegistry);
  registerTraits(traitRegistry);

  return {
    attributeRegistry,
    cityNameRegistry,
    civilizationRegistry,
    leaderRegistry,
    traitRegistry,
  };
};

describe('civ2-civilization', (): void => {
  it("registers Civ2's 21 tribes, in @LEADERS order", (): void => {
    const { civilizationRegistry } = setUp();

    expect(civilizationRegistry.entries()).length(21);
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
      'Celtic',
      'Japanese',
      'Viking',
      'Spanish',
      'Persian',
      'Carthaginian',
      'Sioux',
    ]);
    expect(
      new Set([
        ...civilizationRegistry.entries(),
        ...(Object.values(Civilizations) as unknown as (typeof Civilization)[]),
      ]).size
    ).equal(21);
  });

  it('gives each civilization one leader of its own', (): void => {
    const { civilizationRegistry, leaderRegistry } = setUp();

    expect(leaderRegistry.entries()).length(21);
    expect(
      new Set([
        ...leaderRegistry.entries(),
        ...(Object.values(Leaders) as unknown as (typeof Leader)[]),
      ]).size
    ).equal(21);
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
      colourOf = (CivilizationType: typeof Civilization, name = 'colourSet') =>
        attributeRegistry
          .getByCivilization(CivilizationType)
          .filter((attribute) => attribute.name() === name)
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

  it('gives each civilization its city style, 0 to 3, from @LEADERS', (): void => {
    const { attributeRegistry } = setUp(),
      styleOf = (CivilizationType: typeof Civilization) =>
        attributeRegistry
          .getByCivilization(CivilizationType)
          .filter((attribute) => attribute.name() === 'cityStyle')
          .map((attribute) => attribute.value());

    leaderRows.forEach(({ Leader, cityStyle }) =>
      expect(styleOf(Leader.civilization()), Leader.name).eql([cityStyle])
    );
    // Row 1, the Romans: classical (1); row 8, the Russians: modern (3); row 16, the Japanese: far eastern (2).
    expect(styleOf(Civilizations.Roman)).eql([1]);
    expect(styleOf(Civilizations.Russian)).eql([3]);
    expect(styleOf(Civilizations.Japanese)).eql([2]);
  });

  it('registers the people, nation, colours and city names of the tribes whose packages register none, and only theirs', (): void => {
    const { attributeRegistry, cityNameRegistry } = setUp(),
      namesOf = (CivilizationType: typeof Civilization) =>
        cityNameRegistry
          .entries()
          .filter((cityName) => cityName.civilization() === CivilizationType),
      classOnly = [
        Civilizations.Celtic,
        Civilizations.Spanish,
        Civilizations.Persian,
        Civilizations.Carthaginian,
      ];

    classOnly.forEach((CivilizationType) => {
      const names = attributeRegistry
        .getByCivilization(CivilizationType)
        .map((attribute) => attribute.name());

      expect(names, CivilizationType.name).include.members([
        'people',
        'nation',
        'colors',
        'colourSet',
        'cityStyle',
      ]);

      const cityNames = namesOf(CivilizationType);

      expect(cityNames.length, CivilizationType.name).above(10);
      expect(
        cityNames.filter((cityName) => cityName.capital()),
        CivilizationType.name
      ).length(1);
      expect(cityNames[0].capital()).true;
    });

    // The others' packages register their own: only Civ2's two are added here.
    expect(
      attributeRegistry
        .getByCivilization(Civilizations.Roman)
        .map((attribute) => attribute.name())
    ).eql(['colourSet', 'cityStyle']);
    expect(namesOf(Civilizations.Roman)).length(0);
    // The capital is what a game takes first.
    const [capital] = namesOf(Civilizations.Celtic);

    expect(
      cityNameRegistry.takeCapitalByCivilization(Civilizations.Celtic)
    ).equal(capital.name());
  });
});
