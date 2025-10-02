import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import commentService from "./comment.service";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("{/:id}", isAuthenticated(), commentService.create);

export default commentRouter;