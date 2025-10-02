import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import { IComment, NotFoundException } from "../../utils";
import { CommentFactoryService } from "./factory";
import { CreateCommentDto } from "./comment.dto";

class CommentService {

    private readonly postRepository = new PostRepository();
    private readonly commentRepository = new CommentRepository();
    private readonly commentFactoryService = new CommentFactoryService();

    create = async (req: Request, res: Response) => {
        const { postId, id } = req.params;
        const createCommentDTO: CreateCommentDto = req.body;
        console.log({ postId, id });
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
}

export default new CommentService();