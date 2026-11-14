"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCivilizations = exports.civilizations = void 0;
const CivilizationRegistry_1 = require("@civ-clone/core-civilization/CivilizationRegistry");
const leaders_1 = require("./data/leaders");
// The civilizations in @LEADERS' order.
const civilizations = () => leaders_1.default.map(({ Leader }) => Leader.civilization());
exports.civilizations = civilizations;
const registerCivilizations = (civilizationRegistry = CivilizationRegistry_1.instance) => civilizationRegistry.register(...(0, exports.civilizations)());
exports.registerCivilizations = registerCivilizations;
exports.default = exports.registerCivilizations;
//# sourceMappingURL=registerCivilizations.js.map