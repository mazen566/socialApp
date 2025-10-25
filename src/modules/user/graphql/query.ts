import { GraphQLID } from "graphql";
import { getSpecificUser, getUsers } from "./user-service.graphql";
import { UserListResponse, UserResponse } from "./user-type.graphql";

export const userQuery = {
    getUser: {
        type: UserResponse,
        args: {
            id: { type: GraphQLID },
        },
        resolve: getSpecificUser,
    },
    getUsers: {
        type: UserListResponse,
        resolve: getUsers,
    },
};