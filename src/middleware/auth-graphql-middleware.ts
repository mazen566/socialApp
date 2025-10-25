import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { UserRepository } from "../DB";
import { NotFoundException } from "../utils";

export const isAuthenticatedGraphql = async (context: any) => {
    const token = context.token;
    const payload = verifyToken(token);
    const userRepository = new UserRepository();
    const user = await userRepository.exist(
        { _id: payload._id },
        {},
        { populate: [{ path: "friends", select: "fullName firstName lastName" }] }
    );
    if(!user) {
        throw new NotFoundException("User not found");
    };
    context.user = user;
};
