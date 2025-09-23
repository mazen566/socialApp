import { Router } from "express";
import userService from "./user.service";

const userRouter = Router();

userRouter.get("/:id", userService.getProfile);

export default userRouter;