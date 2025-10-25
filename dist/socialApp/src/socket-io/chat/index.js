"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const DB_1 = require("../../DB");
const sendMessage = (socket, io, connectedUsers) => {
    return async (data) => {
        const destSocket = connectedUsers.get(data.destId);
        socket.emit("successMessage", data);
        io.to(destSocket).emit("receiveMessage", data);
        const messageRepository = new DB_1.MessageRepository();
        const sender = socket.data.user.id;
        const createdMessage = await messageRepository.create({ content: data.message, sender });
        const chatRepository = new DB_1.ChatRepository();
        const chat = await chatRepository.getOne({ users: { $all: [sender, data.destId] } });
        if (!chat) {
            await chatRepository.create({ users: [sender, data.destId], messages: [createdMessage._id] });
        }
        else {
            await chatRepository.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
        }
    };
};
exports.sendMessage = sendMessage;
