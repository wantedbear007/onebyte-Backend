import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mutationsResolvers } from "./resolvers/mutationResolvers";
import queryResolvers from "./resolvers/queryResolvers";
import { port } from "../utils/constants";

// schema
import types from "./schema/types";
import mutations from "./schema/mutations";
import queries from "./schema/queries";
// const typeDefs = readFileSync('./src/graphql/schema/mutations.graphql', { encoding: 'utf-8' });

const schema: string = `${types} ${mutations} ${queries}`;

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationsResolvers,
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

export async function startGraphQL(): Promise<void> {
  const { url } = await startStandaloneServer(server, {
    listen: { port: +port },
  });

  console.log(url);
}
