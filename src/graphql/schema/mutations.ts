const mutations = `#graphql
type userLoginResponse {
  statusCode: Int
  message: String
  token: String
}

type userRegistrationResponse {
  statusCode: Int
  message: String
}

type verifyUserResponse {
  statusCode: Int!,
  message: String!,
  token: String!
}

type Mutation {

  #user verification endpoint
  verifyUser(token: String!): verifyUserResponse

  # user login endpoint
  loginUser(username: String!, password: String!): userLoginResponse

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
