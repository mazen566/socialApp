"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
const mongoose_1 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
exports.chatModel = (0, mongoose_1.model)("Chat", chat_schema_1.chatSchema);
