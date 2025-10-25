"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGraphql = void 0;
const utils_1 = require("../utils");
const isValidGraphql = (schema, args) => {
    let data = args;
    const result = schema.safeParse(data);
    if (!result.success) {
        let errMessages = result.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message
        }));
        throw new utils_1.BadRequestException(JSON.stringify(errMessages));
    }
};
exports.isValidGraphql = isValidGraphql;
