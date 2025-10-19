"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactoryService = void 0;
const entity_1 = require("../entity");
class PostFactoryService {
    createPost(createPostDTO, user) {
        const newPost = new entity_1.Post();
        newPost.content = createPostDTO.content;
        newPost.userId = user._id;
        newPost.reactions = [];
        newPost.attachments = [];
        return newPost;
    }
    updatePost() {
    }
}
exports.PostFactoryService = PostFactoryService;
