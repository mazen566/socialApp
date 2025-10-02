import { IPost } from './../../../utils';
import { AbstractRepository } from "../../abstract.repository"
import { postModel } from './post.model';

export class PostRepository extends AbstractRepository<IPost> {
    constructor() {
        super(postModel);
    }
}