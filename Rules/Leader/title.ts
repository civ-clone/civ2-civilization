import Anarchy from '@civ-clone/base-government-anarchy/Anarchy';
import Communism from '@civ-clone/base-government-communism/Communism';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Democracy from '@civ-clone/base-government-democracy/Democracy';
import Despotism from '@civ-clone/base-government-despotism/Despotism';
import Effect from '@civ-clone/core-rule/Effect';
import Fundamentalism from '@civ-clone/base-government-fundamentalism/Fundamentalism';
import Leader from '@civ-clone/core-civilization/Leader';
import LeaderTitle from '@civ-clone/core-civilization/Rules/LeaderTitle';
import Monarchy from '@civ-clone/base-government-monarchy/Monarchy';
import Republic from '@civ-clone/base-government-republic/Republic';

/**
 * The title key for each of Civilization II's governments, in the game's order. Civ2 gives each tribe's leader a title
 *  under each government (OpenCiv2 `src/auto/civ.cpp` `civ_leader_title`, richardpenman/civ2@e39fe7b: RULES.TXT's
 *  @GOVERNMENTS, unless @LEADERS overrides one); this has one generic title per government, as a translation key whose
 *  words the renderer supplies.
 */
export const titles: [typeof DataObject, string][] = [
  [Anarchy, 'LeaderTitle.civ2.Anarchy'],
  [Despotism, 'LeaderTitle.civ2.Despotism'],
  [Monarchy, 'LeaderTitle.civ2.Monarchy'],
  [Communism, 'LeaderTitle.civ2.Communism'],
  [Fundamentalism, 'LeaderTitle.civ2.Fundamentalism'],
  [Republic, 'LeaderTitle.civ2.Republic'],
  [Democracy, 'LeaderTitle.civ2.Democracy'],
];

export const getRules: () => LeaderTitle[] = (): LeaderTitle[] => [
  new LeaderTitle(
    'civ2-civilization:leader/title',
    new Effect(
      (leader: Leader, government: DataObject): string | undefined =>
        titles.find(
          ([GovernmentType]) => government instanceof GovernmentType
        )?.[1]
    )
  ),
];

export default getRules;
