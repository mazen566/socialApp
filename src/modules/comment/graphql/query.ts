import { GraphQLID } from "graphql";
import { CommentListResponse, CommentResponse } from "./comment-type.graphql";
import { getComments, getSpecificComment } from "./comment-service.graphql";

export const commentQuery = {
    getComment: {
        type: CommentResponse,
        args: {
            id: { type: GraphQLID },
        },
        resolve: getSpecificComment,
    },
    getComments: {
        type: CommentListResponse,
        resolve: getComments,
    },
};