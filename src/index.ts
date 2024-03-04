import dotenv from "dotenv";
import { startGraphQL } from "./graphql/index";
import DatabaseOperations, { DatabaseResponse } from "./prisma/operations";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { userRegistrationModel } from "./graphql/models/userRegistrationModel";

export const prismaInstance = new PrismaClient({ log: ["info", "query"] });

async function startServers(): Promise<void> {
  await startGraphQL();
}

startServers();

const user0: userRegistrationModel = {
  name: "bhanupratap",
  email: "pratapsinghbhanu2444@gmail.com",
  password: "kamlesh123",
  bio: "This is my bio",
  username: "wantedbear0077",
};

async function register(): Promise<void> {
  const res: DatabaseResponse = await DatabaseOperations.registerUser(user0);
  if (res == DatabaseResponse.operationFailed) {
    console.log("error occurred");
  } else {
    console.log("sucess");
  }
}

register();
