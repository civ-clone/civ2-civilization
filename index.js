"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const core_game_1 = require("@civ-clone/core-game");
require("./registerRules");
const registerAttributes_1 = require("./registerAttributes");
const registerCityNames_1 = require("./registerCityNames");
const registerCivilizations_1 = require("./registerCivilizations");
const registerLeaders_1 = require("./registerLeaders");
const registerTraits_1 = require("./registerTraits");
/**
 * Civilization II's civilizations, leaders, traits, attributes and city names into `game`'s own registries, so a game
 *  built with its own gets them (civ-clone/web-renderer#370). Its rules are `registerRules`'.
 */
const register = (game) => {
    (0, registerAttributes_1.default)(game.attributes);
    (0, registerCityNames_1.default)(game.cityNames);
    (0, registerCivilizations_1.default)(game.civilizations);
    (0, registerLeaders_1.default)(game.leaders);
    (0, registerTraits_1.default)(game.traits);
};
exports.register = register;
// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, everything goes into the
//  default game's.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=index.js.map