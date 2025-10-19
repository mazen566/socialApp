import type { NextFunction, Request, Response } from "express";
import { ChatRepository } from "../../DB";

class ChatService {
    private readonly chatRepository = new ChatRepository();

    getChat = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const userLoginId = req.user?._id;
        const chat = await this.chatRepository.getOne(
            { users: { $all: [ userId, userLoginId ] } }, 
            {},
            { populate: [{ path: "messages" }] }
        );
        return res.status(200).json({
            message: "done",
            success: true,
            data: { chat }
        });
    };
}
export default new ChatService();