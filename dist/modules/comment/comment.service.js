"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class CommentService {
    postRepository = new DB_1.PostRepository();
    commentRepository = new DB_1.CommentRepository();
    commentFactoryService = new factory_1.CommentFactoryService();
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        console.log({ postId, id });
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
}
exports.default = new CommentService();
