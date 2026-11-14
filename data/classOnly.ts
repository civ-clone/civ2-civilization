import { Carthaginian, Celtic, Persian, Spanish } from '../Civilizations';
import Civilization from '@civ-clone/core-civilization/Civilization';
import carthaginianAttributes from '@civ-clone/base-civilization-carthaginian/attributes';
import carthaginianCityNames from '@civ-clone/base-civilization-carthaginian/cityNames';
import celticAttributes from '@civ-clone/base-civilization-celtic/attributes';
import celticCityNames from '@civ-clone/base-civilization-celtic/cityNames';
import persianAttributes from '@civ-clone/base-civilization-persian/attributes';
import persianCityNames from '@civ-clone/base-civilization-persian/cityNames';
import spanishAttributes from '@civ-clone/base-civilization-spanish/attributes';
import spanishCityNames from '@civ-clone/base-civilization-spanish/cityNames';

/**
 * The civilizations whose packages register nothing themselves (class only): their attributes (people, nation and
 *  colours) and city names, the capital first, which `registerAttributes` and `registerCityNames` register. The other
 *  17 packages register their own when they load.
 */
export const classOnly: [
  typeof Civilization,
  { [name: string]: unknown },
  string[]
][] = [
  [Celtic, celticAttributes, celticCityNames],
  [Spanish, spanishAttributes, spanishCityNames],
  [Persian, persianAttributes, persianCityNames],
  [Carthaginian, carthaginianAttributes, carthaginianCityNames],
];

export default classOnly;
