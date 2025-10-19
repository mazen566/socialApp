import cors from "cors";
import { Express, NextFunction, Request, Response } from "express";
import { connectDB } from "./DB";
import { authRouter, chatRouter, commentRouter, postRouter, userRouter } from "./modules";
import { AppError } from "./utils";

export function bootstrap(app: Express, express: any) {
  connectDB();

  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.use("/chat", chatRouter);

  app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Invalid Router", success: false });
  });
  
  app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails, stack: error.stack })
  });
};
