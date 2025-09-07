import { Router } from "express";
import authService from "./auth.service";
const authRouter = Router();

authRouter.post("/register", authService.register);

export default authRouter;
