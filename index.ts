import { Game, defaultGame } from '@civ-clone/core-game';
import './registerRules';
import registerAttributes from './registerAttributes';
import registerCityNames from './registerCityNames';
import registerCivilizations from './registerCivilizations';
import registerLeaders from './registerLeaders';
import registerTraits from './registerTraits';

/**
 * Civilization II's civilizations, leaders, traits, attributes and city names into `game`'s own registries, so a game
 *  built with its own gets them (civ-clone/web-renderer#370). Its rules are `registerRules`'.
 */
export const register = (game: Game): void => {
  registerAttributes(game.attributes);
  registerCityNames(game.cityNames);
  registerCivilizations(game.civilizations);
  registerLeaders(game.leaders);
  registerTraits(game.traits);
};

// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, everything goes into the
//  default game's.
register(defaultGame);

export default register;
