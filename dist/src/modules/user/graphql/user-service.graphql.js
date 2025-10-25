"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getSpecificUser = void 0;
const DB_1 = require("../../../DB");
const user_model_1 = require("../../../DB/model/user/user.model");
const auth_graphql_middleware_1 = require("../../../middleware/auth-graphql-middleware");
const validation_graphql_middleware_1 = require("../../../middleware/validation.graphql.middleware");
const user_validation_graphql_1 = require("./user.validation.graphql");
const getSpecificUser = async (parent, args, context) => {
    await (0, auth_graphql_middleware_1.isAuthenticatedGraphql)(context);
    (0, validation_graphql_middleware_1.isValidGraphql)(user_validation_graphql_1.userValidation, args);
    const userRepository = new DB_1.UserRepository();
    const user = await userRepository.getSpecificUser({ _id: args.id });
    if (!user)
        throw new Error("User not found");
    return {
        message: "done",
        success: true,
        data: user,
    };
};
exports.getSpecificUser = getSpecificUser;
const getUsers = async (parent) => {
    const userRepository = new DB_1.UserRepository();
    const user = await user_model_1.userModel.find();
    if (!user)
        throw new Error("User not found");
    return {
        message: "done",
        success: true,
        data: user,
    };
};
exports.getUsers = getUsers;
