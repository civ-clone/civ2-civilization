import {
  AttributeRegistry,
  instance as attributeRegistryInstance,
} from '@civ-clone/core-civilization/AttributeRegistry';
import Attribute from '@civ-clone/core-civilization/Attribute';
import leaderRows from './data/leaders';

/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute. The `base-civilization-*` packages give
 * each civilization its own `colors`; this is Civ2's, for a Civ2 interface to draw with.
 */
export const registerAttributes: (
  attributeRegistry?: AttributeRegistry
) => void = (
  attributeRegistry: AttributeRegistry = attributeRegistryInstance
): void =>
  leaderRows.forEach(({ Leader, colour }): void =>
    attributeRegistry.register(
      new Attribute(Leader.civilization(), 'colourSet', colour)
    )
  );

export default registerAttributes;
