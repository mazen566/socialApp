"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedGraphql = void 0;
const token_1 = require("../utils/token");
const DB_1 = require("../DB");
const utils_1 = require("../utils");
const isAuthenticatedGraphql = async (context) => {
    const token = context.token;
    const payload = (0, token_1.verifyToken)(token);
    const userRepository = new DB_1.UserRepository();
    const user = await userRepository.exist({ _id: payload._id }, {}, { populate: [{ path: "friends", select: "fullName firstName lastName" }] });
    if (!user) {
        throw new utils_1.NotFoundException("User not found");
    }
    ;
    context.user = user;
};
exports.isAuthenticatedGraphql = isAuthenticatedGraphql;
