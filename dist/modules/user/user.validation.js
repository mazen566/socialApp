"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
const zod_1 = require("zod");
exports.sendRequest = zod_1.z.object({
    friendId: zod_1.z.string(),
});
