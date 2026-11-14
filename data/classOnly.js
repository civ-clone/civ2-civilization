"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOnly = void 0;
const Civilizations_1 = require("../Civilizations");
const attributes_1 = require("@civ-clone/base-civilization-carthaginian/attributes");
const cityNames_1 = require("@civ-clone/base-civilization-carthaginian/cityNames");
const attributes_2 = require("@civ-clone/base-civilization-celtic/attributes");
const cityNames_2 = require("@civ-clone/base-civilization-celtic/cityNames");
const attributes_3 = require("@civ-clone/base-civilization-persian/attributes");
const cityNames_3 = require("@civ-clone/base-civilization-persian/cityNames");
const attributes_4 = require("@civ-clone/base-civilization-spanish/attributes");
const cityNames_4 = require("@civ-clone/base-civilization-spanish/cityNames");
/**
 * The civilizations whose packages register nothing themselves (class only): their attributes (people, nation and
 *  colours) and city names, the capital first, which `registerAttributes` and `registerCityNames` register. The other
 *  17 packages register their own when they load.
 */
exports.classOnly = [
    [Civilizations_1.Celtic, attributes_2.default, cityNames_2.default],
    [Civilizations_1.Spanish, attributes_4.default, cityNames_4.default],
    [Civilizations_1.Persian, attributes_3.default, cityNames_3.default],
    [Civilizations_1.Carthaginian, attributes_1.default, cityNames_1.default],
];
exports.default = exports.classOnly;
//# sourceMappingURL=classOnly.js.map