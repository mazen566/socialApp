import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        _id: { type: GraphQLID },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }
});

export const UserResponse = new GraphQLObjectType({
    name: "getUserResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: UserType }
    }
});

export const UserListResponse = new GraphQLObjectType({
    name: "getUserListResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: new GraphQLList(UserType) }
    }
});