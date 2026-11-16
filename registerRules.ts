import { Game, defaultGame } from '@civ-clone/core-game';
import leaderTitle from './Rules/Leader/title';

export const register = (game: Game): void => {
  game.rules.register(...leaderTitle());
};

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
