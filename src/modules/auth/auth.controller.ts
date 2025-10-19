import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware";
import authService from "./auth.service";
import * as authValidation from './auth.validation';

const authRouter = Router();

authRouter.post("/register", isValid(authValidation.registerSchema), authService.register);
authRouter.post("/verify-account", isValid(authValidation.verifyAccountSchema), authService.verifyAccount);
authRouter.post("/login", isValid(authValidation.loginSchema), authService.login);

export default authRouter;
