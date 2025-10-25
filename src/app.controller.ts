import { Express, NextFunction, Request, Response } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { authRouter, chatRouter, commentRouter, postRouter, userRouter } from "./modules";
import cors from "cors";
import { connectDB } from "./DB";
import { AppError } from "./utils";
import { appSchema } from "./app.schema";
import { GraphQLError } from "graphql";

export function bootstrap(app: Express, express: any) {
  connectDB();

  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.use("/chat", chatRouter);
  app.all(
    "/graphql",
    createHandler(({
      schema: appSchema,
      formatError: (error: Readonly<GraphQLError | Error>) => {
        return {
          message: (error as any).message ?? "Internal server error",
          success: false,
          path: (error as any).path,
          errorDetails: (error as any).originalError ?? null
        };
      },
      context: (req: any, params?: any) => {
        const token = req?.headers?.authorization;
        return {
          token,
        }
      }
    }) as any));

  app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Invalid Router", success: false });
  });
  
  app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails, stack: error.stack })
  });
};
