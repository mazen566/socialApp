"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTION = exports.USER_AGENT = exports.GENDER = exports.SYS_ROLE = void 0;
var SYS_ROLE;
(function (SYS_ROLE) {
    SYS_ROLE[SYS_ROLE["user"] = 0] = "user";
    SYS_ROLE[SYS_ROLE["admin"] = 1] = "admin";
    SYS_ROLE[SYS_ROLE["superAdmin"] = 2] = "superAdmin";
})(SYS_ROLE || (exports.SYS_ROLE = SYS_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER[GENDER["male"] = 0] = "male";
    GENDER[GENDER["female"] = 1] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT[USER_AGENT["local"] = 0] = "local";
    USER_AGENT[USER_AGENT["google"] = 1] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var REACTION;
(function (REACTION) {
    REACTION[REACTION["like"] = 0] = "like";
    REACTION[REACTION["love"] = 1] = "love";
    REACTION[REACTION["angry"] = 2] = "angry";
    REACTION[REACTION["care"] = 3] = "care";
    REACTION[REACTION["sad"] = 4] = "sad";
})(REACTION || (exports.REACTION = REACTION = {}));
