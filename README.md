# civ2-civilization

Civilization II's tribes, enough to start a game, on the shared `base-civilization-*` packages, each depended on
individually.

- **Tribes:** the 17 of Civ2's 21 that have a package, registered in @LEADERS order: Roman, Babylonian, German,
  Egyptian, American, Greek, Indian, Russian, Zulu, French, Aztec, Chinese, English, Mongol, Japanese, Viking and Sioux.
  Each package brings its own names, city names and colours.
- **Leaders:** one for each tribe, the existing class nearest to Civ2's.
- **Attitudes:** each leader's three @LEADERS attitudes as the `base-leader-trait-*` traits: rational, normal or
  aggressive (`Friendly`, `NormalAggression`, `Aggressive`); perfectionist, normal or expansionist; militaristic,
  normal or civilized.
- **Colour sets:** each tribe's Civ2 colour set, 1 to 7, as the `colourSet` attribute.

`data/leaders.ts` holds the numbers, row by row. `tests/rulesTxt.test.ts` compares them with your own RULES.TXT when
`CIV2_PATH` is set.

## Not yet here
- The Celts, Spanish, Persians and Carthaginians, which need `base-civilization-*` packages of their own.
- Civ2's own leader names and female leaders, and the titles a leader has under each government.
- City styles.
- Only one tribe of each colour set playing in a game, and a destroyed civilization returning as another of its
  colour.
- The computer players' personality rules (`base-leader-personality`), which need Civ2's advances.
