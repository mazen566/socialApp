"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const post_service_1 = __importDefault(require("./post.service"));
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const postRouter = (0, express_1.Router)();
postRouter.use("/:postId/comment", comment_controller_1.default);
postRouter.post("/", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.create);
postRouter.patch("/:id", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.addReaction);
postRouter.patch("/:id/freeze", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.freezePost);
postRouter.patch("/:id/updatePost", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.updatePost);
postRouter.get("/:id", post_service_1.default.getSpecific);
postRouter.delete("/:id", post_service_1.default.deletePost);
exports.default = postRouter;
