import {
  AttributeRegistry,
  instance as attributeRegistryInstance,
} from '@civ-clone/core-civilization/AttributeRegistry';
import Attribute from '@civ-clone/core-civilization/Attribute';
import classOnly from './data/classOnly';
import leaderRows from './data/leaders';

/**
 * Each civilization's Civ2 colour set, 1 to 7, as the `colourSet` attribute, and its city style, 0 to 3, as
 * `cityStyle`; and the people, nation and colours of the civilizations whose packages register none. The other
 * `base-civilization-*` packages give their civilizations their own `colors`; `colourSet` is Civ2's, for a Civ2
 * interface to draw with.
 */
export const registerAttributes: (
  attributeRegistry?: AttributeRegistry
) => void = (
  attributeRegistry: AttributeRegistry = attributeRegistryInstance
): void => {
  classOnly.forEach(([CivilizationType, attributes]): void =>
    Object.entries(attributes).forEach(([name, value]): void =>
      attributeRegistry.register(new Attribute(CivilizationType, name, value))
    )
  );

  leaderRows.forEach(({ Leader, colour, cityStyle }): void =>
    attributeRegistry.register(
      new Attribute(Leader.civilization(), 'colourSet', colour),
      new Attribute(Leader.civilization(), 'cityStyle', cityStyle)
    )
  );
};

export default registerAttributes;
