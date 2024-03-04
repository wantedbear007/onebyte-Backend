// import { ApolloServer, gql } from 'apollo-server';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   username: string;
//   lastLogin: string;
//   bio: string;
//   pictureURL: string;
// }

// const users: User[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     username: "john_doe",
//     lastLogin: "2024-03-04T08:00:00Z",
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     pictureURL: "https://example.com/john.jpg",
//   },
//   {
//     id: "2",
//     name: "Alice Smith",
//     email: "alice@example.com",
//     username: "alice_smith",
//     lastLogin: "2024-03-03T12:30:00Z",
//     bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     pictureURL: "https://example.com/alice.jpg",
//   },
//   {
//     id: "3",
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     username: "bob_johnson",
//     lastLogin: "2024-03-02T17:45:00Z",
//     bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     pictureURL: "https://example.com/bob.jpg",
//   },
// ];

// const typeDefs = gql`
//   type User {
//     id: String,
//     name: String, 
//     email: String, 
//     username: String,
//     lastLogin: String,
//     bio: String,
//     pictureURL: String,
//   }

//   type Mutation {
//     updateUser(id: String!, name: String, email: String, username: String, bio: String, pictureURL: String): User
//   }

//   type Query {
//     allUsers: [User]
//     name: String
//   }
// `;

// const resolvers = {
//   Query: {
//     allUsers: () => users,
//     name: () => "bhanu"
//   },
//   Mutation: {
//     updateUser: (parent: any, args: User, context: any, info: any) => {
//       const { id, ...updateFields } = args;
//       const userIndex = users.findIndex(user => user.id === id);
//       if (userIndex === -1) {
//         throw new Error("User not found");
//       }
//       users[userIndex] = {
//         ...users[userIndex],
//         ...updateFields
//       };
//       return users[userIndex];
//     }
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
