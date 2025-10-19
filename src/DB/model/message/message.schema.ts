import { Schema } from "mongoose";
import { IMessage } from "../../../utils";

export const messageSchema = new Schema<IMessage>({
    content: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });