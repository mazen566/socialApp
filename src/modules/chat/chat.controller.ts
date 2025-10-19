import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import chatService from "./chat.service";

const chatRouter = Router();

chatRouter.get("/:userId", isAuthenticated(), chatService.getChat);

export default chatRouter