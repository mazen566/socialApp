import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import commentService from "./comment.service";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("{/:id}", isAuthenticated(), commentService.create);
commentRouter.get("/:id", isAuthenticated(), commentService.getSpecific);
commentRouter.delete("/:id", isAuthenticated(), commentService.deleteComment);
commentRouter.patch("/:id", isAuthenticated(), commentService.addReaction);
commentRouter.patch("/:id/freeze", isAuthenticated(), commentService.freezeComment);
commentRouter.patch("/:id/updateComment", isAuthenticated(), commentService.updateComment);

export default commentRouter;