// type def of users 


 const typeDefs = `
  type User {
    username: String,
    password: String
  }
  type Notes {
    id: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "Users" query returns an array of zero or more Books (defined above).

  type Query {
    users: [User]
    notes: [Notes]
  }



`