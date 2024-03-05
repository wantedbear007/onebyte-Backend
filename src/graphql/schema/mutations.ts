const mutations = `
type userLoginResponse {
  username: String
  password: String
}

type userRegistrationResponse {
  statusCode: Int
  message: String
}

type Mutation {
  # user login endpoint
  loginUser(username: String!, password: String!): Boolean

  # user registration endpoint
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
