import { model } from "mongoose";
import { IPost } from "../../../utils";
import { postSchema } from "./post.schema";

export const postModel = model<IPost>("Post", postSchema);