import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// user defined
import { userRegistrationModel } from "./graphql/models/userModel";
import DatabaseOperations, { DatabaseResponse } from "./prisma/operations";
import distributedServerLaunch from "./services/distributedLoad";
import { startGraphQL } from "./graphql/index";
dotenv.config();

export const prismaInstance = new PrismaClient({ log: ["info", "query"] });

async function startServers(): Promise<void> {

  // for single service 
  await startGraphQL();
  
  // for distributed system
  // await distributedServerLaunch();
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

// register();
