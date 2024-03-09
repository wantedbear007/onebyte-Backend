import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import process from "process";

// user defined
import clusteredLaunch from "./services/clusteredLaunch";
import { startGraphQL } from "./graphql/index";
dotenv.config();

export const prismaInstance = new PrismaClient({});

async function startServers(): Promise<void> {
  if (process.argv[2] == "pro") {
    // for single service
    await clusteredLaunch();
  } else {
    // for distributed system
    await startGraphQL();
  }
}
startServers();
