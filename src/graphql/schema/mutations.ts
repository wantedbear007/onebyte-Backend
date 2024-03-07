const mutations = `
type userLoginResponse {
  statusCode: Int
  message: String
  token: String
}

type userRegistrationResponse {
  statusCode: Int
  message: String
}

type Mutation {

  #user verification endpoint
  verifyUser(token: String!): String

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
