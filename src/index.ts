
import { ConnectionServices } from "./Database/connection";
import dotenv from "dotenv"

dotenv.config();

const connection: ConnectionServices = new ConnectionServices();

async function getSorted() {

  const xy = await connection.initialConnection();
  await connection.executeQuery("select * from wanted");
  console.log(xy)
  
}




getSorted()
// console.log(initialConnection());