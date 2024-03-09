import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import process from "process";

// user defined
import distributedServerLaunch from "./services/distributedLoad";
import { startGraphQL } from "./graphql/index";
dotenv.config();

export const prismaInstance = new PrismaClient({});

console.log(process.argv[2])

async function startServers(): Promise<void> {
  // for single service
  await startGraphQL();

  // for distributed system
  // await distributedServerLaunch();
}
startServers();
