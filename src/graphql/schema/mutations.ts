const mutations = `#graphql
type userLoginResponse {
  statusCode: Int
  message: String
  token: String
}

type userResponse {
  statusCode: Int
  message: String
}

type verifyUserResponse {
  statusCode: Int!,
  message: String!,
  token: String!
}

type note {
  id: Int,
  title: String!,
  body: String!,
  # change String to date
  createdAt: String,
  updatedAt: String,
  backgroundColor: String
}

type userNotes {
  message: String!,
  statusCode: Int,
  notes: [note]
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
  ): userResponse

  # create note endpoint
  createNote (
    token: String!
    title: String!
    body: String!
    background: String!
  ): userResponse

  # get all notes for a specific user
  getNotes (
    token: String!
  ): userNotes 

  # to delete note
  deleteNote (token: String!, noteId: Int!): userResponse

}

`;

// implement update user module
export default mutations;
