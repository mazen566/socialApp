"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListResponse = exports.UserResponse = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        fullName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }
});
exports.UserResponse = new graphql_1.GraphQLObjectType({
    name: "getUserResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.UserType }
    }
});
exports.UserListResponse = new graphql_1.GraphQLObjectType({
    name: "getUserListResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.UserType) }
    }
});
