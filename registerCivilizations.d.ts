import { CivilizationRegistry } from '@civ-clone/core-civilization/CivilizationRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
export declare const civilizations: () => (typeof Civilization)[];
export declare const registerCivilizations: (
  civilizationRegistry?: CivilizationRegistry
) => void;
export default registerCivilizations;
