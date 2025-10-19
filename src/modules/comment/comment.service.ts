import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import { IComment, IPost, NotFoundException, BadRequestException } from "../../utils";
import { CommentFactoryService } from "./factory";
import { CreateCommentDto } from "./comment.dto";
import { addReactionProvider } from "../../utils/common/providers/reaction.provider";

class CommentService {

    private readonly postRepository = new PostRepository();
    private readonly commentRepository = new CommentRepository();
    private readonly commentFactoryService = new CommentFactoryService();

    create = async (req: Request, res: Response) => {
        const { postId, id } = req.params;
        const createCommentDTO: CreateCommentDto = req.body;
        const postExist = await this.postRepository.exist({ _id: postId });
        if (!postExist) {
            throw new NotFoundException("Post not found");
        };
        let commentExist: IComment | any = undefined;
        if(id) {
            commentExist = await this.commentRepository.exist({ _id: id });
            if (!commentExist) {
                throw new NotFoundException("Comment not found");
            }
        };
        if (!req.user) {
            throw new NotFoundException("User not found");
        };
        const comment = await this.commentFactoryService.createComment(createCommentDTO, req.user, postExist, commentExist);
        const createdComment = await this.commentRepository.create(comment);
        return res.status(201).json({
            message: "Comment created successfully",
            success: true,
            data: { createdComment }
        });
    }

    getSpecific = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist(
            { _id: id },
            {},
            { populate: [{ path: "replies" }] }
        );
        if (!commentExist) {
            throw new NotFoundException("Comment not found");
        };
        return res.status(200).json({
            message: "Comment found successfully",
            success: true,
            data: { commentExist }
        });
    };

    deleteComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist(
            { _id: id },
            {},
            { populate: [{ path: "postId", select: "userId" }] }
        );
        if(!commentExist) {
            throw new NotFoundException("Comment not found");
        };
        if(commentExist.userId.toString() != req.user?._id.toString() && (commentExist.postId as unknown as IPost).userId.toString() != req.user?._id.toString()) {
            throw new NotFoundException("You are not authorized to delete this comment");
        };
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true,
        });
    };

    addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user?._id;
        if (!id || !userId) {
            return res.status(400).json({ message: "Comment ID is required", success: false });
        }
        await addReactionProvider(this.commentRepository, id, userId.toString(), reaction);
        return res.sendStatus(204);
    };

    freezeComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist(
            { _id: id },
            {},
            { populate: [{ path: "postId", select: "userId" }] }
        );
        if(!commentExist) {
            throw new NotFoundException("Comment not found");
        }
        // allow either the comment owner or the post owner to freeze the comment
        const isOwner = commentExist.userId.toString() == req.user?._id.toString();
        const isPostOwner = (commentExist.postId as unknown as IPost).userId.toString() == req.user?._id.toString();
        if(!isOwner && !isPostOwner) {
            throw new NotFoundException("You are not authorized to freeze this comment");
        }
        await this.commentRepository.update({ _id: id }, { $set: { isFreezed: true } });
        return res.status(200).json({ message: "Comment frozen successfully", success: true });
    };

    updateComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { content } = req.body;
        const commentExist = await this.commentRepository.exist(
            { _id: id },
            {},
            { populate: [{ path: "postId", select: "userId" }] }
        );
        if(!commentExist) {
            throw new NotFoundException("Comment not found");
        };
        if (commentExist.isFreezed) {
            throw new BadRequestException("Comment is frozen and cannot be updated");
        }
        if(commentExist.userId.toString() != req.user?._id.toString() && (commentExist.postId as unknown as IPost).userId.toString() != req.user?._id.toString()) {
            throw new NotFoundException("You are not authorized to update this comment");
        };
        await this.commentRepository.update({ _id: id }, { $set: { content } });
        return res.status(200).json({ message: "Comment updated successfully", success: true });
    };
    
}

export default new CommentService();