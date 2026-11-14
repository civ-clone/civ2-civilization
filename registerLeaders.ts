import {
  LeaderRegistry,
  instance as leaderRegistryInstance,
} from '@civ-clone/core-civilization/LeaderRegistry';
import leaderRows from './data/leaders';

export const registerLeaders: (leaderRegistry?: LeaderRegistry) => void = (
  leaderRegistry: LeaderRegistry = leaderRegistryInstance
): void => leaderRegistry.register(...leaderRows.map(({ Leader }) => Leader));

export default registerLeaders;
