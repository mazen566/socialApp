import { model } from "mongoose";
import { IComment } from "../../../utils";
import { commentSchema } from "./comment.schema";

export const commentModel = model<IComment>("Comment", commentSchema);
