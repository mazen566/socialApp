"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getSpecificComment = void 0;
const DB_1 = require("../../../DB");
const auth_graphql_middleware_1 = require("../../../middleware/auth-graphql-middleware");
const validation_graphql_middleware_1 = require("../../../middleware/validation.graphql.middleware");
const comment_validation_graphql_1 = require("./comment.validation.graphql");
const getSpecificComment = async (parent, args, context) => {
    await (0, auth_graphql_middleware_1.isAuthenticatedGraphql)(context);
    (0, validation_graphql_middleware_1.isValidGraphql)(comment_validation_graphql_1.commentValidation, args);
    const commentRepository = new DB_1.CommentRepository();
    const comment = await commentRepository.getOne({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!comment)
        throw new Error("Comment not found");
    return {
        message: "done",
        success: true,
        data: comment,
    };
};
exports.getSpecificComment = getSpecificComment;
const getComments = async (parent, args) => {
    const commentRepository = new DB_1.CommentRepository();
    const comment = await commentRepository.getAll({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!comment)
        throw new Error("Comment not found");
    return {
        message: "done",
        success: true,
        data: comment,
    };
};
exports.getComments = getComments;
