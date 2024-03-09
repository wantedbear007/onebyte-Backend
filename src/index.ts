import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import process from "process";

// user defined
import clusteredLaunch from "./services/clusteredLaunch";
import { startGraphQL } from "./graphql/index";

export const prismaInstance: PrismaClient = new PrismaClient({});

async function startServices(): Promise<void> {
  try {
    await prismaInstance.$connect();
  } catch (err: any) {
    console.log(err);
    process.exit(1);
  } finally {
    console.log("Database connected");
    prismaInstance.$disconnect();
    if (process.argv[2] === "pro") {
      // for single service
      await clusteredLaunch();
    } else {
      // for distributed system
      dotenv.config();
      await startGraphQL();
    }
  }
}
startServices();
