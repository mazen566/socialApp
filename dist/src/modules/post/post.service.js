"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const reaction_provider_1 = require("../../utils/common/providers/reaction.provider");
const factory_1 = require("./factory");
class PostService {
    postFactoryService = new factory_1.PostFactoryService();
    postRepository = new DB_1.PostRepository();
    create = async (req, res) => {
        const createPostDTO = req.body;
        const post = this.postFactoryService.createPost(createPostDTO, req.user);
        const createdPost = await this.postRepository.create(post);
        res.status(201).json({
            message: "Post created successfully",
            success: true,
            data: { createdPost }
        });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user?._id;
        if (!id || !userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }
        await (0, reaction_provider_1.addReactionProvider)(this.postRepository, id, userId.toString(), reaction);
        return res.sendStatus(204);
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, { populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } }
            ]
        });
        if (!post) {
            throw new utils_1.NotFoundException("post not found");
        }
        ;
        return res.status(200).json({
            message: "Done",
            success: true,
            data: { post }
        });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        ;
        if (postExist.userId.toString() != req.user?._id.toString()) {
            throw new utils_1.NotFoundException("You are not authorized to delete this post");
        }
        ;
        await this.postRepository.delete({ _id: id });
        return res.status(200).json({
            message: "Post deleted successfully",
            success: true,
        });
    };
    freezePost = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        ;
        if (postExist.userId.toString() != req.user?._id.toString()) {
            throw new utils_1.NotFoundException("You are not authorized to freeze this post");
        }
        ;
        await this.postRepository.update({ _id: id }, { $set: { isFreezed: true } });
        return res.status(200).json({ message: "Post frozen successfully", success: true });
    };
    updatePost = async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const postExist = await this.postRepository.getOne({ _id: id });
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (postExist.isFreezed) {
            throw new utils_1.NotFoundException("Post is frozen");
        }
        if (postExist.userId.toString() != req.user?._id.toString()) {
            throw new utils_1.NotFoundException("You are not authorized to update this post");
        }
        await this.postRepository.update({ _id: id }, { $set: { content } });
        return res.status(200).json({ message: "Post updated successfully", success: true });
    };
}
exports.default = new PostService();
