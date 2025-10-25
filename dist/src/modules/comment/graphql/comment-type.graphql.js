"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentListResponse = exports.CommentResponse = exports.CommentType = void 0;
const graphql_1 = require("graphql");
const user_type_graphql_1 = require("../../user/graphql/user-type.graphql");
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: { type: user_type_graphql_1.UserType },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    },
});
exports.CommentResponse = new graphql_1.GraphQLObjectType({
    name: "getCommentResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.CommentType }
    }
});
exports.CommentListResponse = new graphql_1.GraphQLObjectType({
    name: "getCommentListResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.CommentType) }
    }
});
