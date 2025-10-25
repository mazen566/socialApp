"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getSpecificPost = void 0;
const DB_1 = require("../../../DB");
const auth_graphql_middleware_1 = require("../../../middleware/auth-graphql-middleware");
const validation_graphql_middleware_1 = require("../../../middleware/validation.graphql.middleware");
const post_validation_graphql_1 = require("./post.validation.graphql");
const getSpecificPost = async (parent, args, context) => {
    await (0, auth_graphql_middleware_1.isAuthenticatedGraphql)(context);
    (0, validation_graphql_middleware_1.isValidGraphql)(post_validation_graphql_1.postValidation, args);
    const postRepository = new DB_1.PostRepository();
    const post = await postRepository.getOne({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!post)
        throw new Error("Post not found");
    return {
        message: "done",
        success: true,
        data: post,
    };
};
exports.getSpecificPost = getSpecificPost;
const getPosts = async (parent, args) => {
    const postRepository = new DB_1.PostRepository();
    const post = await postRepository.getAll({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!post)
        throw new Error("Post not found");
    return {
        message: "done",
        success: true,
        data: post,
    };
};
exports.getPosts = getPosts;
