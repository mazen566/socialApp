"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
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
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        ;
        let userReacted = postExist.reactions.findIndex((ele) => {
            return ele.userId.toString() == userId?.toString();
        });
        if (userReacted == -1) {
            await this.postRepository.update({ _id: id }, { $push: { reactions: { userId, reaction } } });
        }
        else if ([undefined, null, ""].includes(reaction)) {
            await this.postRepository.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReacted] } });
        }
        else {
            await this.postRepository.update({ _id: id, 'reactions.userId': userId }, { 'reactions.$.reaction': reaction });
        }
        ;
        return res.sendStatus(204);
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, { populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" }
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
}
exports.default = new PostService();
