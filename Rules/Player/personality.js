"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Traits_1 = require("../../Traits");
const TraitRegistry_1 = require("@civ-clone/core-civilization/TraitRegistry");
const ArmySize_1 = require("@civ-clone/base-leader-personality/Rules/Player/ArmySize");
const AttackConfidence_1 = require("@civ-clone/base-leader-personality/Rules/Player/AttackConfidence");
const BuildWeight_1 = require("@civ-clone/base-leader-personality/Rules/Player/BuildWeight");
const CityImprovement_1 = require("@civ-clone/core-city-improvement/CityImprovement");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Expansion_1 = require("@civ-clone/base-leader-personality/Rules/Player/Expansion");
const MilitaryUnhappinessTolerance_1 = require("@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance");
const NonCombatant_1 = require("@civ-clone/base-unit-trait-non-combatant/NonCombatant");
const OverseasSettlers_1 = require("@civ-clone/base-leader-personality/Rules/Player/OverseasSettlers");
const PollutionConcern_1 = require("@civ-clone/base-leader-personality/Rules/Player/PollutionConcern");
const ScienceBias_1 = require("@civ-clone/base-leader-personality/Rules/Player/ScienceBias");
const Terraforms_1 = require("@civ-clone/base-unit-trait-terraforms/Terraforms");
const Unit_1 = require("@civ-clone/core-unit/Unit");
const Wonder_1 = require("@civ-clone/core-wonder/Wonder");
const traits_1 = require("@civ-clone/core-unit/traits");
const leaderHas_1 = require("@civ-clone/base-leader-personality/lib/leaderHas");
// What each leader's three attitudes (@LEADERS' attack, expand and civilize, each −1, 0 or 1, as `registerTraits` gives
//  them) make a computer player do, as base-leader-personality's rules, so the AI that reads those plays Civ2's leaders
//  by their attitudes with no change of its own. Which attitude drives what follows where the original's AI reads it
//  (OpenCiv2, richardpenman/civ2@e39fe7b); the amounts are the ones Civ1's personality uses for the same traits, as
//  the AI is tuned to them. The original's full negotiation personality is civ2-diplomacy's, which reads the traits
//  itself.
const isImprovement = (item) => Object.prototype.isPrototypeOf.call(CityImprovement_1.default, item) &&
    !Object.prototype.isPrototypeOf.call(Wonder_1.default, item);
// A unit built to fight: not a worker (`Terraforms`) and not a unit of diplomacy or trade (`NonCombatant`), as the
//  game's rules declare them.
const isMilitary = (item, ruleRegistry) => Object.prototype.isPrototypeOf.call(Unit_1.default, item) &&
    !(0, traits_1.hasTrait)(item, Terraforms_1.default, ruleRegistry) &&
    !(0, traits_1.hasTrait)(item, NonCombatant_1.default, ruleRegistry);
// civilize: 1 for a Civilized leader, −1 for a Militaristic one, 0 for the rest, who have no rule.
const civilize = [
    [Traits_1.Civilized, 1],
    [Traits_1.Militaristic, -1],
];
const getRules = (ruleRegistry, traitRegistry = TraitRegistry_1.instance) => {
    const has = (TraitType) => (0, leaderHas_1.default)(traitRegistry, TraitType), id = (name) => `civ2-civilization:player/personality/${name}`;
    return [
        // Science: the AI's rate is civilize + (10 − luxuries) / 2 (`civ.cpp` 3283–3333).
        ...civilize.map(([TraitType, value]) => new ScienceBias_1.default(id(`science-bias/${TraitType.name}`), has(TraitType), new Effect_1.default(() => value))),
        // War weariness under the Republic and Democracy weighs (attack + aggressive units) × (7 − civilize) in its
        //  government score (`city.cpp` 4525–4553).
        ...civilize.map(([TraitType, value]) => new MilitaryUnhappinessTolerance_1.default(id(`military-unhappiness-tolerance/${TraitType.name}`), has(TraitType), new Effect_1.default(() => value))),
        // Expansion: expand sets the continent policy (`ai.cpp` 979, 1252) and, with civilize, the weight of Settlers in
        //  production (`city_production.cpp` 1748–1854).
        new Expansion_1.default(id('expansion/Perfectionist'), has(Traits_1.Perfectionist), new Effect_1.default(() => 1 / 3)),
        new Expansion_1.default(id('expansion/Expansionist'), has(Traits_1.Expansionist), new Effect_1.default(() => 5 / 3)),
        ...civilize.map(([TraitType, value]) => new Expansion_1.default(id(`expansion/${TraitType.name}`), has(TraitType), new Effect_1.default(() => 6 / (6 - value)))),
        new OverseasSettlers_1.default(id('overseas-settlers/Expansionist'), has(Traits_1.Expansionist), new Effect_1.default(() => 0.5)),
        // Production weighs improvements up and units down for a civilized leader, and the other way for a militaristic
        //  one (`city_production.cpp` 756–760, 1119–1124, 1220–1284).
        ...civilize.map(([TraitType, value]) => new BuildWeight_1.default(id(`build-weight/${TraitType.name}`), has(TraitType), new Effect_1.default((player, item) => isImprovement(item)
            ? (value + 3) / 3
            : isMilitary(item, ruleRegistry)
                ? (3 - value) / 3
                : 1))),
        new ArmySize_1.default(id('army-size/Militaristic'), has(Traits_1.Militaristic), new Effect_1.default((player, rival) => rival === null ? 1 : 2)),
        new ArmySize_1.default(id('army-size/Civilized'), has(Traits_1.Civilized), new Effect_1.default((player, rival) => rival === null ? 0.5 : 1)),
        // attack: an aggressive leader inclines to war, a friendly one to peace (`diplomacy.cpp` 409, 2282, 5540).
        new AttackConfidence_1.default(id('attack-confidence/Aggressive'), has(Traits_1.Aggressive), new Effect_1.default(() => 1.25)),
        new AttackConfidence_1.default(id('attack-confidence/Friendly'), has(Traits_1.Friendly), new Effect_1.default(() => 0.9)),
        // Pollution: a civilized or friendly leader cleans it up more readily.
        new PollutionConcern_1.default(id('pollution-concern/Civilized'), has(Traits_1.Civilized), new Effect_1.default(() => 1.5)),
        new PollutionConcern_1.default(id('pollution-concern/Friendly'), has(Traits_1.Friendly), new Effect_1.default(() => 1.25)),
        new PollutionConcern_1.default(id('pollution-concern/Militaristic'), has(Traits_1.Militaristic), new Effect_1.default(() => 0.75)),
        new PollutionConcern_1.default(id('pollution-concern/Aggressive'), has(Traits_1.Aggressive), new Effect_1.default(() => 0.75)),
    ];
};
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=personality.js.map