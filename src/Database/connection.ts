import { Client } from "pg";

export class ConnectionServices {
  dbURL: string = process.env.DATABASE!;

  constructor() {}

  clientInstance!: Client;
  isConnected: boolean = false;

  // to establish connection
  async initialConnection(): Promise<boolean> {
    try {
      const client: Client = new Client(this.dbURL);
      // await client.connect();
      console.log("connection estb");
      this.clientInstance = client;
      this.isConnected = true;
      return this.isConnected;
    } catch (err) {
      console.log("error occurred");
      return this.isConnected;
    }
  }
  // to execute query
  async executeQuery(query: string): Promise<void> {
    try {
      await this.clientInstance?.connect();
      const results = await this.clientInstance?.query(query);
      console.log(results.rows);
      await this.clientInstance?.end();
    } catch (err) {
      console.log("error in query execution !!!");
      console.log(err);
    }
  }
}
