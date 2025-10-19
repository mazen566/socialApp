import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { isValid } from "../../middleware/validation.middleware";
import * as userValidation from "./user.validation";

const userRouter = Router();

userRouter.get("/profile", isAuthenticated(), userService.getProfile);
userRouter.post("/send-request/:friendId", isAuthenticated(), isValid(userValidation.sendRequest), userService.sendRequest);
userRouter.put("/accept-request/:friendId", isAuthenticated(), userService.acceptRequest);
userRouter.delete("/unfriend/:friendId", isAuthenticated(), userService.unFriend);

export default userRouter;