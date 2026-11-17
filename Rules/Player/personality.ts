import {
  Aggressive,
  Civilized,
  Expansionist,
  Friendly,
  Militaristic,
  Perfectionist,
} from '../../Traits';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from '@civ-clone/core-civilization/TraitRegistry';
import ArmySize from '@civ-clone/base-leader-personality/Rules/Player/ArmySize';
import AttackConfidence from '@civ-clone/base-leader-personality/Rules/Player/AttackConfidence';
import BuildWeight from '@civ-clone/base-leader-personality/Rules/Player/BuildWeight';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Effect from '@civ-clone/core-rule/Effect';
import Expansion from '@civ-clone/base-leader-personality/Rules/Player/Expansion';
import MilitaryUnhappinessTolerance from '@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance';
import NonCombatant from '@civ-clone/base-unit-trait-non-combatant/NonCombatant';
import OverseasSettlers from '@civ-clone/base-leader-personality/Rules/Player/OverseasSettlers';
import Player from '@civ-clone/core-player/Player';
import PollutionConcern from '@civ-clone/base-leader-personality/Rules/Player/PollutionConcern';
import Rule from '@civ-clone/core-rule/Rule';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import ScienceBias from '@civ-clone/base-leader-personality/Rules/Player/ScienceBias';
import Terraforms from '@civ-clone/base-unit-trait-terraforms/Terraforms';
import Trait from '@civ-clone/core-civilization/Trait';
import Unit from '@civ-clone/core-unit/Unit';
import Wonder from '@civ-clone/core-wonder/Wonder';
import { hasTrait } from '@civ-clone/core-unit/traits';
import leaderHas from '@civ-clone/base-leader-personality/lib/leaderHas';

// What each leader's three attitudes (@LEADERS' attack, expand and civilize, each −1, 0 or 1, as `registerTraits` gives
//  them) make a computer player do, as base-leader-personality's rules, so the AI that reads those plays Civ2's leaders
//  by their attitudes with no change of its own. Which attitude drives what follows where the original's AI reads it
//  (OpenCiv2, richardpenman/civ2@e39fe7b); the amounts are the ones Civ1's personality uses for the same traits, as
//  the AI is tuned to them. The original's full negotiation personality is civ2-diplomacy's, which reads the traits
//  itself.

const isImprovement = (item: object): boolean =>
  Object.prototype.isPrototypeOf.call(CityImprovement, item) &&
  !Object.prototype.isPrototypeOf.call(Wonder, item);

// A unit built to fight: not a worker (`Terraforms`) and not a unit of diplomacy or trade (`NonCombatant`), as the
//  game's rules declare them.
const isMilitary = (item: object, ruleRegistry: RuleRegistry): boolean =>
  Object.prototype.isPrototypeOf.call(Unit, item) &&
  !hasTrait(item as typeof Unit, Terraforms, ruleRegistry) &&
  !hasTrait(item as typeof Unit, NonCombatant, ruleRegistry);

// civilize: 1 for a Civilized leader, −1 for a Militaristic one, 0 for the rest, who have no rule.
const civilize: [typeof Trait, number][] = [
  [Civilized, 1],
  [Militaristic, -1],
];

export const getRules = (
  ruleRegistry: RuleRegistry,
  traitRegistry: TraitRegistry = traitRegistryInstance
): Rule[] => {
  const has = <C extends [Player, ...any[]]>(TraitType: typeof Trait) =>
      leaderHas<C>(traitRegistry, TraitType),
    id = (name: string): string =>
      `civ2-civilization:player/personality/${name}`;

  return [
    // Science: the AI's rate is civilize + (10 − luxuries) / 2 (`civ.cpp` 3283–3333).
    ...civilize.map(
      ([TraitType, value]) =>
        new ScienceBias(
          id(`science-bias/${TraitType.name}`),
          has(TraitType),
          new Effect(() => value)
        )
    ),

    // War weariness under the Republic and Democracy weighs (attack + aggressive units) × (7 − civilize) in its
    //  government score (`city.cpp` 4525–4553).
    ...civilize.map(
      ([TraitType, value]) =>
        new MilitaryUnhappinessTolerance(
          id(`military-unhappiness-tolerance/${TraitType.name}`),
          has(TraitType),
          new Effect(() => value)
        )
    ),

    // Expansion: expand sets the continent policy (`ai.cpp` 979, 1252) and, with civilize, the weight of Settlers in
    //  production (`city_production.cpp` 1748–1854).
    new Expansion(
      id('expansion/Perfectionist'),
      has(Perfectionist),
      new Effect(() => 1 / 3)
    ),
    new Expansion(
      id('expansion/Expansionist'),
      has(Expansionist),
      new Effect(() => 5 / 3)
    ),
    ...civilize.map(
      ([TraitType, value]) =>
        new Expansion(
          id(`expansion/${TraitType.name}`),
          has(TraitType),
          new Effect(() => 6 / (6 - value))
        )
    ),
    new OverseasSettlers(
      id('overseas-settlers/Expansionist'),
      has(Expansionist),
      new Effect(() => 0.5)
    ),

    // Production weighs improvements up and units down for a civilized leader, and the other way for a militaristic
    //  one (`city_production.cpp` 756–760, 1119–1124, 1220–1284).
    ...civilize.map(
      ([TraitType, value]) =>
        new BuildWeight(
          id(`build-weight/${TraitType.name}`),
          has(TraitType),
          new Effect((player: Player, item: object): number =>
            isImprovement(item)
              ? (value + 3) / 3
              : isMilitary(item, ruleRegistry)
              ? (3 - value) / 3
              : 1
          )
        )
    ),
    new ArmySize(
      id('army-size/Militaristic'),
      has(Militaristic),
      new Effect((player: Player, rival: Player | null): number =>
        rival === null ? 1 : 2
      )
    ),
    new ArmySize(
      id('army-size/Civilized'),
      has(Civilized),
      new Effect((player: Player, rival: Player | null): number =>
        rival === null ? 0.5 : 1
      )
    ),

    // attack: an aggressive leader inclines to war, a friendly one to peace (`diplomacy.cpp` 409, 2282, 5540).
    new AttackConfidence(
      id('attack-confidence/Aggressive'),
      has(Aggressive),
      new Effect(() => 1.25)
    ),
    new AttackConfidence(
      id('attack-confidence/Friendly'),
      has(Friendly),
      new Effect(() => 0.9)
    ),

    // Pollution: a civilized or friendly leader cleans it up more readily.
    new PollutionConcern(
      id('pollution-concern/Civilized'),
      has(Civilized),
      new Effect(() => 1.5)
    ),
    new PollutionConcern(
      id('pollution-concern/Friendly'),
      has(Friendly),
      new Effect(() => 1.25)
    ),
    new PollutionConcern(
      id('pollution-concern/Militaristic'),
      has(Militaristic),
      new Effect(() => 0.75)
    ),
    new PollutionConcern(
      id('pollution-concern/Aggressive'),
      has(Aggressive),
      new Effect(() => 0.75)
    ),
  ];
};

export default getRules;
