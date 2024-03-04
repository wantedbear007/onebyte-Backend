

const users = [
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "lastLogin": "2024-03-04T08:00:00Z",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "pictureURL": "https://example.com/john.jpg"
  },
  {
    "id": "2",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "username": "alice_smith",
    "lastLogin": "2024-03-03T12:30:00Z",
    "bio": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "pictureURL": "https://example.com/alice.jpg"
  },
  {
    "id": "3",
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "username": "bob_johnson",
    "lastLogin": "2024-03-02T17:45:00Z",
    "bio": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "pictureURL": "https://example.com/bob.jpg"
  }
]

export const resolvers = {
  Query: {
    allUsers: () => users,
    // notes: () => notes,
    
  },
};
