import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { postQuery } from "./modules/post/graphql/query";

let query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...postQuery as any,
    },
});

export const appSchema = new GraphQLSchema({
    query,
});