"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLeaders = void 0;
const LeaderRegistry_1 = require("@civ-clone/core-civilization/LeaderRegistry");
const leaders_1 = require("./data/leaders");
const registerLeaders = (leaderRegistry = LeaderRegistry_1.instance) => leaderRegistry.register(...leaders_1.default.map(({ Leader }) => Leader));
exports.registerLeaders = registerLeaders;
exports.default = exports.registerLeaders;
//# sourceMappingURL=registerLeaders.js.map