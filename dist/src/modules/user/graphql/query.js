"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuery = void 0;
const graphql_1 = require("graphql");
const user_service_graphql_1 = require("./user-service.graphql");
const user_type_graphql_1 = require("./user-type.graphql");
exports.userQuery = {
    getUser: {
        type: user_type_graphql_1.UserResponse,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve: user_service_graphql_1.getSpecificUser,
    },
    getUsers: {
        type: user_type_graphql_1.UserListResponse,
        resolve: user_service_graphql_1.getUsers,
    },
};
