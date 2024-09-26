const cluster = require("cluster");
const os = require("os");
const numCPUs = 2; // We are using 2 replicas

if (cluster.isMaster) {
  console.log(`Master process is running with PID: ${process.pid}`);

  // Fork workers (2 replicas)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, fork a new one
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker with PID: ${worker.process.pid} died. Forking a new worker.`
    );
    cluster.fork();
  });
} else {
  console.log(`Worker process is running with PID: ${process.pid}`);
  require("./index"); // Your server code (index.js) will be run by each worker
}
