const types = `#graphql

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

  type User {
    userId: String,
    name: String,
    email: String,
    username: String,
    lastLogin: String,
    bio: String
    pictureURL: String
  }
  `;

export default types;
