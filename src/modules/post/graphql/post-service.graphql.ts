import { PostRepository } from "../../../DB";
import { isAuthenticatedGraphql } from "../../../middleware/auth-graphql-middleware";
import { isValidGraphql } from "../../../middleware/validation.graphql.middleware";
import { postValidation } from "./post.validation.graphql";

export const getSpecificPost = async (parent: any, args: { id: string }, context: any) => {
    await isAuthenticatedGraphql(context);
    isValidGraphql(postValidation, args);
    const postRepository = new PostRepository();
    const post = await postRepository.getOne(
        { _id: args.id },
        {},
        { populate: [{ path: "userId" }] }
    );
    if(!post) throw new Error("Post not found");
    return {
        message: "done",
        success: true,
        data: post,
    };
};

export const getPosts = async (parent: any, args: { id: string }) => {
    const postRepository = new PostRepository();
    const post = await postRepository.getAll(
        { _id: args.id },
        {},
        { populate: [{ path: "userId" }] }
    );
    if(!post) throw new Error("Post not found");
    return {
        message: "done",
        success: true,
        data: post,
    };
};
