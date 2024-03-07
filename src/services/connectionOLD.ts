import { Client } from "pg";

export enum ConnectionResponse {
  clientError = 1,
  queryError = 2,
  success = 3,
  connectionError = 4,
}

export class ConnectionServices {
  dbURL: string = process.env.DATABASE!;

  clientInstance!: Client;
  isConnected: boolean = false;

  // to establish connection
  async initialConnection(): Promise<boolean> {
    try {
      const client: Client = new Client(this.dbURL);
      // await client.connect();
      console.log("connection est");
      this.clientInstance = client;
      this.isConnected = true;
      return this.isConnected;
    } catch (err) {
      console.log("error occurred");
      return this.isConnected;
    }
  }
  // to execute query
  async executeQuery(query: string): Promise<ConnectionResponse> {
    try {
      if (!this.clientInstance) {
        return ConnectionResponse.clientError;
      }
      await this.clientInstance?.connect();
      const results = await this.clientInstance?.query(query);
      console.log(results.rows);
      await this.clientInstance?.end();
      return ConnectionResponse.success;
    } catch (err) {
      console.log("error in query execution !!!");
      console.log(err);
      return ConnectionResponse.connectionError;
    }
  }

  async getResults(query: string): Promise<void> {
    try {
      // check connection
    } catch (err) {}
  }
}
