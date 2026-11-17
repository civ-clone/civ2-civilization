import { TraitRegistry } from '@civ-clone/core-civilization/TraitRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
export declare const getRules: (
  ruleRegistry: RuleRegistry,
  traitRegistry?: TraitRegistry
) => Rule[];
export default getRules;
