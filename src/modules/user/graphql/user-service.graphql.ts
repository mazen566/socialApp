import { UserRepository } from "../../../DB";
import { userModel } from "../../../DB/model/user/user.model";
import { isAuthenticatedGraphql } from "../../../middleware/auth-graphql-middleware";
import { isValidGraphql } from "../../../middleware/validation.graphql.middleware";
import { userValidation } from "./user.validation.graphql";

export const getSpecificUser = async (parent: any, args: { id: string }, context: any) => {
    await isAuthenticatedGraphql(context);
    isValidGraphql(userValidation, args);
    const userRepository = new UserRepository();
    const user = await userRepository.getSpecificUser({ _id: args.id });
    if(!user) throw new Error("User not found");
    return {
        message: "done",
        success: true,
        data: user,
    };
};

export const getUsers = async (parent: any) => {
    const userRepository = new UserRepository();
    const user = await userModel.find();
    if(!user) throw new Error("User not found");
    return {
        message: "done",
        success: true,
        data: user,
    };
};
