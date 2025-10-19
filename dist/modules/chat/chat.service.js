"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
class ChatService {
    chatRepository = new DB_1.ChatRepository();
    getChat = async (req, res) => {
        const { userId } = req.params;
        const userLoginId = req.user?._id;
        const chat = await this.chatRepository.getOne({ users: { $all: [userId, userLoginId] } }, {}, { populate: [{ path: "messages" }] });
        return res.status(200).json({
            message: "done",
            success: true,
            data: { chat }
        });
    };
}
exports.default = new ChatService();
