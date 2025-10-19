import { CommentRepository, PostRepository } from "../../../DB";
import { NotFoundException } from "../../error";

export const addReactionProvider = async (repo: CommentRepository | PostRepository, id: string, userId: string, reaction: string) => {
    const postExist = await repo.exist({ _id: id })
    if (!postExist) {
        throw new NotFoundException("post not found");
    };
    let userReacted = postExist.reactions.findIndex((ele) => {
        return ele.userId.toString() == userId?.toString();
    });
    if (userReacted == -1) {
        await repo.update(
            { _id: id },
            { $push: { reactions: { userId, reaction } } }
            );
    } else if ([undefined, null, ""].includes(reaction)) {
        await repo.update(
            { _id: id },
            { $pull: { reactions: postExist.reactions[userReacted] } }
        );
    } else {
        await repo.update(
            { _id: id, 'reactions.userId' : userId },
            { 'reactions.$.reaction' : reaction }
        )
    };
}