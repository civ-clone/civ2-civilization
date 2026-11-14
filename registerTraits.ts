import {
  Aggressive,
  Civilized,
  Expansionist,
  Friendly,
  Militaristic,
  NormalAggression,
  NormalDevelopment,
  NormalMilitarism,
  Perfectionist,
} from './Traits';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from '@civ-clone/core-civilization/TraitRegistry';
import Leader from '@civ-clone/core-civilization/Leader';
import leaderRows from './data/leaders';

type LeaderTrait = new (LeaderType: typeof Leader) => InstanceType<
  typeof Friendly
>;

// Each attitude's -1, 0 and 1, as the `base-leader-trait-*` traits Civ1's leaders have too.
const attitudes: [
  'attack' | 'expand' | 'civilize',
  [LeaderTrait, LeaderTrait, LeaderTrait]
][] = [
  ['attack', [Friendly, NormalAggression, Aggressive]],
  ['expand', [Perfectionist, NormalDevelopment, Expansionist]],
  ['civilize', [Militaristic, NormalMilitarism, Civilized]],
];

export const registerTraits: (traitRegistry?: TraitRegistry) => void = (
  traitRegistry: TraitRegistry = traitRegistryInstance
): void =>
  leaderRows.forEach((row): void =>
    attitudes.forEach(([attitude, traits]): void =>
      traitRegistry.register(new traits[row[attitude] + 1](row.Leader))
    )
  );

export default registerTraits;
