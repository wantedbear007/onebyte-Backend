import cluster, { Worker } from "cluster";
import os from "os";
import { startGraphQL } from "../graphql/index";

async function clusteredLaunch() {
  // number of server instances
  const cpuCores: number = os.cpus().length;
  const system: string = os.machine();

  console.log("Loads", os.loadavg());

  console.log(`Total CPUs: ${cpuCores} System: ${system}`);

  if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // running instances
    for (let i: number = 0; i < cpuCores; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker: Worker, code) => {
      console.log(
        `Worker ${worker.process.pid} died, Err ${code}. Trying to restart !`,
      );
      cluster.fork();
    });
  } else {
    await startGraphQL();
  }
}

export default clusteredLaunch;
