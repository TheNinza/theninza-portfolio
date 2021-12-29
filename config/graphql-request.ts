import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (typeof GRAPHQL_ENDPOINT === "undefined") {
  throw new Error("No GraphQL endpoint defined");
}

export const client = new GraphQLClient(GRAPHQL_ENDPOINT);
