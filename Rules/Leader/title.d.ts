import DataObject from '@civ-clone/core-data-object/DataObject';
import LeaderTitle from '@civ-clone/core-civilization/Rules/LeaderTitle';
/**
 * The title key for each of Civilization II's governments, in the game's order. Civ2 gives each tribe's leader a title
 *  under each government (OpenCiv2 `src/auto/civ.cpp` `civ_leader_title`, richardpenman/civ2@e39fe7b: RULES.TXT's
 *  @GOVERNMENTS, unless @LEADERS overrides one); this has one generic title per government, as a translation key whose
 *  words the renderer supplies.
 */
export declare const titles: [typeof DataObject, string][];
export declare const getRules: () => LeaderTitle[];
export default getRules;
