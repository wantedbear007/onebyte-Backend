import express from "express";
import { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
// import { typeDefs } from "./schema";
// import { resolvers } from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { url } from "inspector";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    username: "john_doe",
    lastLogin: "2024-03-04T08:00:00Z",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    pictureURL: "https://example.com/john.jpg",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    username: "alice_smith",
    lastLogin: "2024-03-03T12:30:00Z",
    bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pictureURL: "https://example.com/alice.jpg",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    username: "bob_johnson",
    lastLogin: "2024-03-02T17:45:00Z",
    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    pictureURL: "https://example.com/bob.jpg",
  },
];

const typeDefs = `
type Users {
  id: String,
  name: String, 
  email: String, 
  username: String,
  lastLogin: String,
  bio: String,
  pictureURL: String,
}

type Mutation {
  getName(id: String, name: String!): String
}

type Query {
  allUsers: [Users]
  name: String
}
`;

const resolvers = {
  Query: {
    allUsers: () => users,
    name: () => "bhanu",
  },

  Mutation: {
    getName: (
      parent: any,
      args: { id: string; name: string },
      context: any,
      info: any
    ) => {
      console.log(args);

      console.log(args.name);
      return args.name
    },
  },
};

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

// sample
