// import { ConnectionServices } from "./Database/connectionOLD";
// import dotenv from "dotenv"

// dotenv.config();

// const connection: ConnectionServices = new ConnectionServices();

// async function getSorted() {

//   const xy = await connection.initialConnection();
//   await connection.executeQuery("select * from wanted");
//   console.log(xy)

// }

// getSorted()

import dotenv from "dotenv";

dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  await prisma.user.create({
    data: {
      bio: "this is a bio",
      email: "random@gmail.com",
      name: "Bhanupratap singh",
      password: "simplepassword",
      username: "wantedbear007",
    },
  });
}

main()
  .then(async () => {
    console.log("user created");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log("user creation failed");
    console.log(err);
    await prisma.$disconnect();
  });
