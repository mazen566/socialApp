import { model } from "mongoose";
import { chatSchema } from "./chat.schema";
import { IChat } from "../../../utils";

export const chatModel = model<IChat>("Chat", chatSchema);
