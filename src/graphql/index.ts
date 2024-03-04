import express from "express";
import { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDef";
import { resolvers } from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { url } from "inspector";

const app = express();

// const port: string = process.env.PORT || 4000;

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export async function startGraphQL(): Promise<void> {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(url);
}
