"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.titles = void 0;
const Anarchy_1 = require("@civ-clone/base-government-anarchy/Anarchy");
const Communism_1 = require("@civ-clone/base-government-communism/Communism");
const Democracy_1 = require("@civ-clone/base-government-democracy/Democracy");
const Despotism_1 = require("@civ-clone/base-government-despotism/Despotism");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Fundamentalism_1 = require("@civ-clone/base-government-fundamentalism/Fundamentalism");
const LeaderTitle_1 = require("@civ-clone/core-civilization/Rules/LeaderTitle");
const Monarchy_1 = require("@civ-clone/base-government-monarchy/Monarchy");
const Republic_1 = require("@civ-clone/base-government-republic/Republic");
/**
 * The title key for each of Civilization II's governments, in the game's order. Civ2 gives each tribe's leader a title
 *  under each government (OpenCiv2 `src/auto/civ.cpp` `civ_leader_title`, richardpenman/civ2@e39fe7b: RULES.TXT's
 *  @GOVERNMENTS, unless @LEADERS overrides one); this has one generic title per government, as a translation key whose
 *  words the renderer supplies.
 */
exports.titles = [
    [Anarchy_1.default, 'LeaderTitle.civ2.Anarchy'],
    [Despotism_1.default, 'LeaderTitle.civ2.Despotism'],
    [Monarchy_1.default, 'LeaderTitle.civ2.Monarchy'],
    [Communism_1.default, 'LeaderTitle.civ2.Communism'],
    [Fundamentalism_1.default, 'LeaderTitle.civ2.Fundamentalism'],
    [Republic_1.default, 'LeaderTitle.civ2.Republic'],
    [Democracy_1.default, 'LeaderTitle.civ2.Democracy'],
];
const getRules = () => [
    new LeaderTitle_1.default('civ2-civilization:leader/title', new Effect_1.default((leader, government) => {
        var _a;
        return (_a = exports.titles.find(([GovernmentType]) => government instanceof GovernmentType)) === null || _a === void 0 ? void 0 : _a[1];
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=title.js.map