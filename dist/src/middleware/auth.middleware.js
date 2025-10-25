"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const token_1 = require("../utils/token");
const DB_1 = require("../DB");
const utils_1 = require("../utils");
const isAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, token_1.verifyToken)(token);
        const userRepository = new DB_1.UserRepository();
        const user = await userRepository.exist({ _id: payload._id }, {}, { populate: [{ path: "friends", select: "fullName firstName lastName" }] });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        ;
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
