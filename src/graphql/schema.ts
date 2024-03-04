import { buildSchema } from "graphql";

export const typeDefs = `
  type Users {
    id: String,
    name: String, 
    email: String, 
    username: String,
    lastLogin: String,
    bio: String,
    pictureURL: String,
  }

  type Query: {
    // hello: String,
    allUsers: [Users]
  }
`

export const schema = buildSchema(
  `
    type Query {
      hello: String
    }
  `
)

