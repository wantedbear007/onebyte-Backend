const users = [
  {
    username: "bhanu",
    password: "noob developer"
  },
  {
    username: "badbear",
    password: "random123"
  }
]

export const resolvers = {
  Query: {
    users: () => users
  }
}