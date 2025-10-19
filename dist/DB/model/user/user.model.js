"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./user.schema");
exports.userModel = (0, mongoose_1.model)("User", user_schema_1.userSchema);
