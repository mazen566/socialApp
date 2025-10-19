"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionProvider = void 0;
const error_1 = require("../../error");
const addReactionProvider = async (repo, id, userId, reaction) => {
    const postExist = await repo.exist({ _id: id });
    if (!postExist) {
        throw new error_1.NotFoundException("post not found");
    }
    ;
    let userReacted = postExist.reactions.findIndex((ele) => {
        return ele.userId.toString() == userId?.toString();
    });
    if (userReacted == -1) {
        await repo.update({ _id: id }, { $push: { reactions: { userId, reaction } } });
    }
    else if ([undefined, null, ""].includes(reaction)) {
        await repo.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReacted] } });
    }
    else {
        await repo.update({ _id: id, 'reactions.userId': userId }, { 'reactions.$.reaction': reaction });
    }
    ;
};
exports.addReactionProvider = addReactionProvider;
