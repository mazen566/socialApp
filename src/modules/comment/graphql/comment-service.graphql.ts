import { CommentRepository } from "../../../DB";
import { isAuthenticatedGraphql } from "../../../middleware/auth-graphql-middleware";
import { isValidGraphql } from "../../../middleware/validation.graphql.middleware";
import { commentValidation } from "./comment.validation.graphql";

export const getSpecificComment = async (parent: any, args: { id: string }, context: any) => {
    await isAuthenticatedGraphql(context);
    isValidGraphql(commentValidation, args);
    const commentRepository = new CommentRepository();
    const comment = await commentRepository.getOne(
        { _id: args.id },
        {},
        { populate: [{ path: "userId" }] }
    );
    if(!comment) throw new Error("Comment not found");
    return {
        message: "done",
        success: true,
        data: comment,
    };
};

export const getComments = async (parent: any, args: { id: string }) => {
    const commentRepository = new CommentRepository();
    const comment = await commentRepository.getAll(
        { _id: args.id },
        {},
        { populate: [{ path: "userId" }] }
    );
    if(!comment) throw new Error("Comment not found");
    return {
        message: "done",
        success: true,
        data: comment,
    };
};
