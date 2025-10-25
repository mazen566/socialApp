import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../../user/graphql/user-type.graphql";

export const PostType = new GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        userId: { type: UserType },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

export const PostResponse = new GraphQLObjectType({
    name: "getPostResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: PostType }
    }
});

export const PostListResponse = new GraphQLObjectType({
    name: "getPostListResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: new GraphQLList(PostType) }
    }
});

