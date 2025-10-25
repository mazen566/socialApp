"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostListResponse = exports.PostResponse = exports.PostType = void 0;
const graphql_1 = require("graphql");
const user_type_graphql_1 = require("../../user/graphql/user-type.graphql");
exports.PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: { type: user_type_graphql_1.UserType },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    },
});
exports.PostResponse = new graphql_1.GraphQLObjectType({
    name: "getPostResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.PostType }
    }
});
exports.PostListResponse = new graphql_1.GraphQLObjectType({
    name: "getPostListResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.PostType) }
    }
});
