import { IComment, IPost, IUser } from '../../../utils';
import { Comment } from '../entity';
import { CreateCommentDto } from './../comment.dto';

export class CommentFactoryService {
    createComment(createCommentDto: CreateCommentDto, user: IUser, post: IPost, comment?: IComment) {
        const newComment = new Comment();

        newComment.content = createCommentDto.content;
        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.parentIds = comment
            ? [...comment.parentIds, comment._id]
            : [];
        newComment.reactions = [];

        return newComment;
    }
}