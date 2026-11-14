import { AttributeRegistry } from '@civ-clone/core-civilization/AttributeRegistry';
/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute, and its city style, 0 to 3, as
 * `cityStyle`; and the people, nation and colours of the civilizations whose packages register none. The other
 * `base-civilization-*` packages give their civilizations their own `colors`; `colourSet` is Civ2's, for a Civ2
 * interface to draw with.
 */
export declare const registerAttributes: (
  attributeRegistry?: AttributeRegistry
) => void;
export default registerAttributes;
