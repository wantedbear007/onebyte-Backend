const mutations = `
type Mutation {
  getName(name: String!): String
  registerUser(
    name: String!
    email: String!
    username: String!
    bio: String!
    profileUrl: String
    password: String!
  ): String
}

`;

export default mutations;
