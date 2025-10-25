"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
const reaction_provider_1 = require("../../utils/common/providers/reaction.provider");
class CommentService {
    postRepository = new DB_1.PostRepository();
    commentRepository = new DB_1.CommentRepository();
    commentFactoryService = new factory_1.CommentFactoryService();
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        const postExist = await this.postRepository.exist({ _id: postId });
        if (!postExist) {
            throw new utils_1.NotFoundException("Post not found");
        }
        ;
        let commentExist = undefined;
        if (id) {
            commentExist = await this.commentRepository.exist({ _id: id });
            if (!commentExist) {
                throw new utils_1.NotFoundException("Comment not found");
            }
        }
        ;
        if (!req.user) {
            throw new utils_1.NotFoundException("User not found");
        }
        ;
        const comment = await this.commentFactoryService.createComment(createCommentDTO, req.user, postExist, commentExist);
        const createdComment = await this.commentRepository.create(comment);
        return res.status(201).json({
            message: "Comment created successfully",
            success: true,
            data: { createdComment }
        });
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "replies" }] });
        if (!commentExist) {
            throw new utils_1.NotFoundException("Comment not found");
        }
        ;
        return res.status(200).json({
            message: "Comment found successfully",
            success: true,
            data: { commentExist }
        });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExist) {
            throw new utils_1.NotFoundException("Comment not found");
        }
        ;
        if (commentExist.userId.toString() != req.user?._id.toString() && commentExist.postId.userId.toString() != req.user?._id.toString()) {
            throw new utils_1.NotFoundException("You are not authorized to delete this comment");
        }
        ;
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true,
        });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user?._id;
        if (!id || !userId) {
            return res.status(400).json({ message: "Comment ID is required", success: false });
        }
        await (0, reaction_provider_1.addReactionProvider)(this.commentRepository, id, userId.toString(), reaction);
        return res.sendStatus(204);
    };
    freezeComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExist) {
            throw new utils_1.NotFoundException("Comment not found");
        }
        // allow either the comment owner or the post owner to freeze the comment
        const isOwner = commentExist.userId.toString() == req.user?._id.toString();
        const isPostOwner = commentExist.postId.userId.toString() == req.user?._id.toString();
        if (!isOwner && !isPostOwner) {
            throw new utils_1.NotFoundException("You are not authorized to freeze this comment");
        }
        await this.commentRepository.update({ _id: id }, { $set: { isFreezed: true } });
        return res.status(200).json({ message: "Comment frozen successfully", success: true });
    };
    updateComment = async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExist) {
            throw new utils_1.NotFoundException("Comment not found");
        }
        ;
        if (commentExist.isFreezed) {
            throw new utils_1.BadRequestException("Comment is frozen and cannot be updated");
        }
        if (commentExist.userId.toString() != req.user?._id.toString() && commentExist.postId.userId.toString() != req.user?._id.toString()) {
            throw new utils_1.NotFoundException("You are not authorized to update this comment");
        }
        ;
        await this.commentRepository.update({ _id: id }, { $set: { content } });
        return res.status(200).json({ message: "Comment updated successfully", success: true });
    };
}
exports.default = new CommentService();
