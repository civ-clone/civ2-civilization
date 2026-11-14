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

`data/leaders.ts` holds the numbers, row by row. `tests/rulesTxt.test.ts` compares them with your own RULES.TXT when
`CIV2_PATH` is set.

## Not yet here
- Civ2's own leader names and female leaders (the Celts are led by Brennus, not Cunobelin or Boadicea), and the titles
  a leader has under each government. No Civilopedia text.
- Only one tribe of each colour set playing in a game, and a destroyed civilization returning as another of its
  colour.
- **Unread attitude:** nothing in a civ2 game reads the perfectionist–expansionist traits yet. The computer players'
  personality rules (`base-leader-personality`) would, and Civilization II's AI reads all three attitudes in its
  production, settling and science choices (OpenCiv2 `city_production.cpp`, `ai.cpp`).
