import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../../user/graphql/user-type.graphql";

export const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        userId: { type: UserType },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

export const CommentResponse = new GraphQLObjectType({
    name: "getCommentResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: CommentType }
    }
});

export const CommentListResponse = new GraphQLObjectType({
    name: "getCommentListResponse",
    fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: new GraphQLList(CommentType) }
    }
});

