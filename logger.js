// logger.js
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "task_logs.txt");

function logTaskCompletion(user_id) {
  const logEntry = `${user_id}-task completed at-${Date.now()}\n`;
  fs.appendFileSync(logFilePath, logEntry);
}

module.exports = { logTaskCompletion };
