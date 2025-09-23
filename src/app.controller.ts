import { Express, NextFunction, Request, Response } from "express";
import { connectDB } from "./DB";
import { authRouter, userRouter } from "./modules";
import { AppError } from "./utils";
export function bootstrap(app: Express, express: any) {
  connectDB();

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Invalid Router", success: false });
  });
  
  app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails })
  })
}
