"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTraits = void 0;
const Traits_1 = require("./Traits");
const TraitRegistry_1 = require("@civ-clone/core-civilization/TraitRegistry");
const leaders_1 = require("./data/leaders");
// Each attitude's -1, 0 and 1, as the `base-leader-trait-*` traits Civ1's leaders have too.
const attitudes = [
    ['attack', [Traits_1.Friendly, Traits_1.NormalAggression, Traits_1.Aggressive]],
    ['expand', [Traits_1.Perfectionist, Traits_1.NormalDevelopment, Traits_1.Expansionist]],
    ['civilize', [Traits_1.Militaristic, Traits_1.NormalMilitarism, Traits_1.Civilized]],
];
const registerTraits = (traitRegistry = TraitRegistry_1.instance) => leaders_1.default.forEach((row) => attitudes.forEach(([attitude, traits]) => traitRegistry.register(new traits[row[attitude] + 1](row.Leader))));
exports.registerTraits = registerTraits;
exports.default = exports.registerTraits;
//# sourceMappingURL=registerTraits.js.map