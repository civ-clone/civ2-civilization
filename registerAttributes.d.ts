import { AttributeRegistry } from '@civ-clone/core-civilization/AttributeRegistry';
/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute. The `base-civilization-*` packages give
 * each civilization its own `colors`; this is Civ2's, for a Civ2 interface to draw with.
 */
export declare const registerAttributes: (
  attributeRegistry?: AttributeRegistry
) => void;
export default registerAttributes;
