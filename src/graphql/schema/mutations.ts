const mutations = `
type userRegistrationResponse {
  statusCode: Int
  message: String
}

type Mutation {
  getName(name: String!): String
  registerUser(
    name: String!
    email: String!
    username: String!
    bio: String!
    profileUrl: String
    password: String!
  ): userRegistrationResponse
}

`;

export default mutations;
