import { Express } from "express";
import authRouter from "./modules/auth/auth.controller";
import { connectDB } from "./DB/connectDB";
export function bootstrap(app: Express, express: any) {
  app.use(express.json());

  app.use("/auth", authRouter);

  app.use("/{*dummy}", (req, res, next) => {
    res.status(404).json({ message: "Invalid Router", success: false });
  });
  connectDB();
}
