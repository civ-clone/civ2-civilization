import { Game } from '@civ-clone/core-game';
import './registerRules';
/**
 * Civilization II's civilizations, leaders, traits, attributes and city names into `game`'s own registries, so a game
 *  built with its own gets them (civ-clone/web-renderer#370). Its rules are `registerRules`'.
 */
export declare const register: (game: Game) => void;
export default register;
