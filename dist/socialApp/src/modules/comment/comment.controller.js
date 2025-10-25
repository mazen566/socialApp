"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const comment_service_1 = __importDefault(require("./comment.service"));
const commentRouter = (0, express_1.Router)({ mergeParams: true });
commentRouter.post("{/:id}", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.create);
commentRouter.get("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.getSpecific);
commentRouter.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.deleteComment);
commentRouter.patch("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.addReaction);
commentRouter.patch("/:id/freeze", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.freezeComment);
commentRouter.patch("/:id/updateComment", (0, auth_middleware_1.isAuthenticated)(), comment_service_1.default.updateComment);
exports.default = commentRouter;
