import { model } from "mongoose";
import { IUser } from "../../../utils";
import { userSchema } from "./user.schema";

export const userModel = model<IUser>("User", userSchema);

