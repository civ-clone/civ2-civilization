"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCityNames = void 0;
const CityNameRegistry_1 = require("@civ-clone/core-civilization/CityNameRegistry");
const CityName_1 = require("@civ-clone/core-civilization/CityName");
const classOnly_1 = require("./data/classOnly");
/** The city names of the civilizations whose packages register none, the first of each its capital. */
const registerCityNames = (cityNameRegistry = CityNameRegistry_1.instance) => classOnly_1.default.forEach(([CivilizationType, , names]) => names.forEach((name, index) => cityNameRegistry.register(new CityName_1.default(name, CivilizationType, index === 0))));
exports.registerCityNames = registerCityNames;
exports.default = exports.registerCityNames;
//# sourceMappingURL=registerCityNames.js.map