"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const cors_1 = __importDefault(require("cors"));
const DB_1 = require("./DB");
const modules_1 = require("./modules");
function bootstrap(app, express) {
    (0, DB_1.connectDB)();
    app.use(express.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use("/auth", modules_1.authRouter);
    app.use("/user", modules_1.userRouter);
    app.use("/post", modules_1.postRouter);
    app.use("/comment", modules_1.commentRouter);
    app.use("/chat", modules_1.chatRouter);
    app.use("/{*dummy}", (req, res, next) => {
        res.status(404).json({ message: "Invalid Router", success: false });
    });
    app.use((error, req, res, next) => {
        return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails, stack: error.stack });
    });
}
;
