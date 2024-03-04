import dotenv from "dotenv";
import { startGraphQL } from "./graphql/index";
dotenv.config();

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ log: ["info", "query"] });

async function startServers(): Promise<void> {
  await startGraphQL();
}

startServers();
