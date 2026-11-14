import {
  CivilizationRegistry,
  instance as civilizationRegistryInstance,
} from '@civ-clone/core-civilization/CivilizationRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import leaderRows from './data/leaders';

// The civilizations in @LEADERS' order.
export const civilizations = (): (typeof Civilization)[] =>
  leaderRows.map(({ Leader }) => Leader.civilization());

export const registerCivilizations: (
  civilizationRegistry?: CivilizationRegistry
) => void = (
  civilizationRegistry: CivilizationRegistry = civilizationRegistryInstance
): void => civilizationRegistry.register(...civilizations());

export default registerCivilizations;
