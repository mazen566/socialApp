import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { NotFoundException } from "../../utils";
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
        const postExist = await this.postRepository.exist({ _id: id })
        if (!postExist) {
            throw new NotFoundException("post not found");
        };
        let userReacted = postExist.reactions.findIndex((ele) => {
            return ele.userId.toString() == userId?.toString();
        });
        if (userReacted == -1) {
            await this.postRepository.update(
                { _id: id },
                { $push: { reactions: { userId, reaction } } }
            );
        } else if ([undefined, null, ""].includes(reaction)) {
            await this.postRepository.update(
                { _id: id },
                { $pull: { reactions: postExist.reactions[userReacted] } }
            );
        } else {
            await this.postRepository.update(
                { _id: id, 'reactions.userId' : userId },
                { 'reactions.$.reaction' : reaction }
            )
        };
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
                { path: "comments", match: { parentIds: [] } }
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
}

export default new PostService();