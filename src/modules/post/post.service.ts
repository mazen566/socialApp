import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { NotFoundException } from "../../utils";
import { addReactionProvider } from "../../utils/common/providers/reaction.provider";
import { PostFactoryService } from "./factory";
import { CreatePostDTO } from "./post.dto";

class PostService {

    private readonly postFactoryService = new PostFactoryService();
    private readonly postRepository = new PostRepository();

    create = async (req: Request, res: Response) => {
        const createPostDTO: CreatePostDTO = req.body;
        const post = this.postFactoryService.createPost(createPostDTO, req.user!);
        const createdPost = await this.postRepository.create(post);
        res.status(201).json({
            message: "Post created successfully",
            success: true,
            data: { createdPost }
        });
    };

    addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user?._id;
        if (!id || !userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }
        await addReactionProvider(this.postRepository, id, userId.toString(), reaction);
        return res.sendStatus(204);
    };

    getSpecific = async (req: Request, res: Response) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne(
            { _id: id },
            {},
            { populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } }
               ]
            }
        );
        if (!post) {
            throw new NotFoundException("post not found");
        };
        return res.status(200).json({
            message: "Done",
            success: true,
            data: { post }
        });
    };

    deletePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if(!postExist) {
            throw new NotFoundException("post not found");
        };
        if(postExist.userId.toString() != req.user?._id.toString()) {
            throw new NotFoundException("You are not authorized to delete this post");
        };
        await this.postRepository.delete({ _id: id });
        return res.status(200).json({
            message: "Post deleted successfully",
            success: true,
        });
    };

    freezePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if(!postExist) {
            throw new NotFoundException("post not found");
        };
        if(postExist.userId.toString() != req.user?._id.toString()) {
            throw new NotFoundException("You are not authorized to freeze this post");
        };
        await this.postRepository.update({ _id: id }, { $set: { isFreezed: true } });
        return res.status(200).json({ message: "Post frozen successfully", success: true });
    };

    updatePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { content } = req.body;
        const postExist = await this.postRepository.getOne({ _id: id });
        if(!postExist) {
            throw new NotFoundException("post not found");
        }
        if (postExist.isFreezed) {
            throw new NotFoundException("Post is frozen");
        }
        if(postExist.userId.toString() != req.user?._id.toString()) {
            throw new NotFoundException("You are not authorized to update this post");
        }
        await this.postRepository.update({ _id: id }, { $set: { content } });
        return res.status(200).json({ message: "Post updated successfully", success: true });
    };
}

export default new PostService();