import Civilization from '@civ-clone/core-civilization/Civilization';
/**
 * The civilizations whose packages register nothing themselves (class only): their attributes (people, nation and
 *  colours) and city names, the capital first, which `registerAttributes` and `registerCityNames` register. The other
 *  17 packages register their own when they load.
 */
export declare const classOnly: [
  typeof Civilization,
  {
    [name: string]: unknown;
  },
  string[]
][];
export default classOnly;
