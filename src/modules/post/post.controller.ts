import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import postService from "./post.service";
import commentRouter from "../comment/comment.controller";

const postRouter = Router();

postRouter.use("/:postId/comment", commentRouter)

postRouter.post("/", isAuthenticated(), postService.create);
postRouter.patch("/:id", isAuthenticated(), postService.addReaction);
postRouter.patch("/:id/freeze", isAuthenticated(), postService.freezePost);
postRouter.patch("/:id/updatePost", isAuthenticated(), postService.updatePost);
postRouter.get("/:id", postService.getSpecific);
postRouter.delete("/:id", postService.deletePost);

export default postRouter;

