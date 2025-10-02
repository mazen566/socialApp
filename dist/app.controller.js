"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const DB_1 = require("./DB");
const modules_1 = require("./modules");
function bootstrap(app, express) {
    (0, DB_1.connectDB)();
    app.use(express.json());
    app.use("/auth", modules_1.authRouter);
    app.use("/user", modules_1.userRouter);
    app.use("/post", modules_1.postRouter);
    app.use("/{*dummy}", (req, res, next) => {
        res.status(404).json({ message: "Invalid Router", success: false });
    });
    app.use((error, req, res, next) => {
        return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails });
    });
}
