"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAttributes = void 0;
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
const Attribute_1 = require("@civ-clone/core-civilization/Attribute");
const classOnly_1 = require("./data/classOnly");
const leaders_1 = require("./data/leaders");
/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute, and its city style, 0 to 3, as
 * `cityStyle`; and the people, nation and colours of the civilizations whose packages register none. The other
 * `base-civilization-*` packages give their civilizations their own `colors`; `colourSet` is Civ2's, for a Civ2
 * interface to draw with.
 */
const registerAttributes = (attributeRegistry = AttributeRegistry_1.instance) => {
    classOnly_1.default.forEach(([CivilizationType, attributes]) => Object.entries(attributes).forEach(([name, value]) => attributeRegistry.register(new Attribute_1.default(CivilizationType, name, value))));
    leaders_1.default.forEach(({ Leader, colour, cityStyle }) => attributeRegistry.register(new Attribute_1.default(Leader.civilization(), 'colourSet', colour), new Attribute_1.default(Leader.civilization(), 'cityStyle', cityStyle)));
};
exports.registerAttributes = registerAttributes;
exports.default = exports.registerAttributes;
//# sourceMappingURL=registerAttributes.js.map