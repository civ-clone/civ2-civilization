"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAttributes = void 0;
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
const Attribute_1 = require("@civ-clone/core-civilization/Attribute");
const leaders_1 = require("./data/leaders");
/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute. The `base-civilization-*` packages give
 * each civilization its own `colors`; this is Civ2's, for a Civ2 interface to draw with.
 */
const registerAttributes = (attributeRegistry = AttributeRegistry_1.instance) => leaders_1.default.forEach(({ Leader, colour }) => attributeRegistry.register(new Attribute_1.default(Leader.civilization(), 'colourSet', colour)));
exports.registerAttributes = registerAttributes;
exports.default = exports.registerAttributes;
//# sourceMappingURL=registerAttributes.js.map