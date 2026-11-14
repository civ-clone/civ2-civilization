import {
  CityNameRegistry,
  instance as cityNameRegistryInstance,
} from '@civ-clone/core-civilization/CityNameRegistry';
import CityName from '@civ-clone/core-civilization/CityName';
import classOnly from './data/classOnly';

/** The city names of the civilizations whose packages register none, the first of each its capital. */
export const registerCityNames: (
  cityNameRegistry?: CityNameRegistry
) => void = (
  cityNameRegistry: CityNameRegistry = cityNameRegistryInstance
): void =>
  classOnly.forEach(([CivilizationType, , names]): void =>
    names.forEach((name: string, index: number): void =>
      cityNameRegistry.register(
        new CityName(name, CivilizationType, index === 0)
      )
    )
  );

export default registerCityNames;
