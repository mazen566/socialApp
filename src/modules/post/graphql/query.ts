import { GraphQLID } from "graphql";
import { getPosts, getSpecificPost } from "./post-service.graphql";
import { PostListResponse, PostResponse } from "./post-type.graphql";

export const postQuery = {
    getPost: {
        type: PostResponse,
        args: {
            id: { type: GraphQLID },
        },
        resolve: getSpecificPost,
    },
    getPosts: {
        type: PostListResponse,
        resolve: getPosts,
    },
};