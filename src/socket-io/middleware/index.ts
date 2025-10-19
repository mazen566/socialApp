import { Socket } from "socket.io";
import { UserRepository } from "../../DB";
import { NotFoundException } from "../../utils";
import { verifyToken } from "../../utils/token";

export const socketAuth = async (socket: Socket, next: Function) => {
    try {
        const { authorization } = socket.handshake.auth;
        const payload = verifyToken(authorization);
        const userRepository = new UserRepository();
        const user = await userRepository.getOne({ _id: payload._id });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        socket.data.user = user;
        next();
    } catch (error) {
        next(error);
    }
};