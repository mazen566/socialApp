import { Server, Socket } from "socket.io";
import { ChatRepository, MessageRepository } from "../../DB";
import { ObjectId } from "mongoose";

interface ISendMessage {
    message: string;
    destId: string;
}
export const sendMessage = (socket: Socket, io: Server, connectedUsers: Map<string, string>) => {
    return async (data: ISendMessage) => {
        const destSocket = connectedUsers.get(data.destId);
        socket.emit("successMessage", data);
        io.to(destSocket!).emit("receiveMessage", data);
        const messageRepository = new MessageRepository();
        const sender = socket.data.user.id
        const createdMessage = await messageRepository.create({ content: data.message, sender });
        const chatRepository = new ChatRepository();
        const chat = await chatRepository.getOne({ users: { $all: [ sender, data.destId ] } });
        if (!chat) {
            await chatRepository.create({ users: [ sender, data.destId ], messages: [ createdMessage._id as unknown as ObjectId] });
        } else {
            await chatRepository.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
        }
    }
}