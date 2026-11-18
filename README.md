# civ2-civilization

Civilization II's 21 tribes on the shared `base-civilization-*` packages, each depended on individually.

- **Tribes:** all 21, registered in @LEADERS order: Roman, Babylonian, German, Egyptian, American, Greek, Indian,
  Russian, Zulu, French, Aztec, Chinese, English, Mongol, Celtic, Japanese, Viking, Spanish, Persian, Carthaginian and
  Sioux. The 17 older packages bring their own names, city names and colours; the Celtic, Spanish, Persian and
  Carthaginian packages register nothing themselves, so this package registers their people, nation, colours and city
  names (the capital first).
- **Leaders:** one for each tribe, the existing class nearest to Civ2's.
- **Attitudes:** each leader's three @LEADERS attitudes as the `base-leader-trait-*` traits: rational, normal or
  aggressive (`Friendly`, `NormalAggression`, `Aggressive`); perfectionist, normal or expansionist; militaristic,
  normal or civilized. civ2-diplomacy reads the first, as the leader's temper at a meeting, and civ2-player the third, when it balances
  starts.
- **Colour sets:** each tribe's Civ2 colour set, 1 to 7, as the `colourSet` attribute.
- **City styles:** each tribe's city style, 0 to 3, as the `cityStyle` attribute.
- **Leader titles:** a `LeaderTitle` rule (core-civilization) answering a translation key for each government,
  `LeaderTitle.civ2.<Government>` (`LeaderTitle.civ2.Monarchy`, say), and nothing for a government Civ2 doesn't have.
  The words are the renderer's own.
- **Personality** (`Rules/Player/personality`): what the three attitudes make a computer player do, as
  base-leader-personality's rules, so the AI plays each leader by its attitudes with no change of its own. civilize
  leans science (`ScienceBias`), war weariness (`MilitaryUnhappinessTolerance`), production (`BuildWeight`), the army
  (`ArmySize`) and Settlers (`Expansion`); expand sets Settlers (`Expansion`) and overseas settling
  (`OverseasSettlers`); attack sets `AttackConfidence`; civilize and attack set `PollutionConcern`. Which attitude
  drives what follows where the original's AI reads it; the amounts are those Civ1's personality uses. No
  `WantedAdvances` (the original's science never stops) or `AdvanceGrade`.

`data/leaders.ts` holds the numbers, row by row. `tests/rulesTxt.test.ts` compares them with your own RULES.TXT when
`CIV2_PATH` is set.

## Not yet here
- Civ2's own leader names and female leaders (the Celts are led by Brennus, not Cunobelin or Boadicea). No Civilopedia
  text.
- Civ2's titles differ by tribe and by a male or female leader (`civ_leader_title`: RULES.TXT's @GOVERNMENTS, unless
  @LEADERS overrides one); these are one per government. Titles from a player's own RULES.TXT aren't read.
- Only one tribe of each colour set playing in a game, and a destroyed civilization returning as another of its
  colour.
- **The original's own weights:** the personality rules use Civ1's amounts, not the original's production, settling and
  science formulas (OpenCiv2 `city_production.cpp`, `ai.cpp`).
