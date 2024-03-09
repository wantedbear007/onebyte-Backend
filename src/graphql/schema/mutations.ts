const mutations = `#graphql

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


  # to add
  # edit notes, delete users, search notes

}

`;

export default mutations;
