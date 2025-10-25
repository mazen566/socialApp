import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";

export interface IAttachment {
    url: string;
    id: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    password: string;
    credentialUpdatedAt: Date;
    phoneNumber?: string;
    role: SYS_ROLE;
    gender: GENDER;
    userAgent?: USER_AGENT;
    otp?: string;
    otpExpiredAt?: Date;
    isVerified: boolean;
    friendRequests?: ObjectId[];
    friends?: ObjectId[]; 
}

export interface IUser {
    _id: ObjectId;
}

export interface IReaction {
    reaction: REACTION;
    userId: ObjectId;
}

export interface IPost {
    _id: ObjectId;
    userId: ObjectId;
    content: string;
    reactions: IReaction[];
    isFreezed?: boolean;
    attachments?: IAttachment[]
}

export interface IComment {
    _id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    parentId: ObjectId | null;
    content: string;
    attachment: IAttachment;
    reactions: IReaction[];
    isFreezed?: boolean;
    mentions?: ObjectId[];  
}

export interface IChat {
    users: ObjectId[];
    messages: ObjectId[];
}

export interface IMessage {
    content: string;
    sender: ObjectId;
    attachment?: IAttachment[];
    reactions?: IReaction[];
}

export interface IPayload extends JwtPayload {
    _id: string;
    role: string;
}

declare module "express" {
    interface Request {
        user?: IUser;
    }
}
