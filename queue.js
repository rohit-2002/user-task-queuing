const { createClient } = require("redis");
const fs = require("fs");

// Create Redis client
const redisClient = createClient();

// Connect the Redis client and handle connection errors
redisClient.connect().catch(console.error);

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});

// Redis queue key
const QUEUE_KEY = "task_queue";

// Function to log task completion
async function logTaskCompletion(user_id) {
  const logEntry = `${user_id}-task completed at-${new Date().toISOString()}\n`;
  fs.appendFile("task_logs.txt", logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

// Function to add task to the queue
async function addTask(user_id) {
  const task = { user_id, timestamp: Date.now() };

  try {
    // Add task to Redis queue using lPush
    await redisClient.lPush(QUEUE_KEY, JSON.stringify(task));
    console.log(
      `Task for user ${user_id} queued at ${new Date().toISOString()}`
    );
  } catch (err) {
    console.error("Error adding task:", err);
  }
}

// Function to process tasks
async function processTasks() {
  setInterval(async () => {
    try {
      // Ensure Redis client is connected before attempting to use it
      if (!redisClient.isOpen) {
        console.error("Redis client is closed. Unable to process tasks.");
        return;
      }

      // Use Redis lPop method to get the next task
      const taskString = await redisClient.lPop(QUEUE_KEY);

      if (taskString) {
        const task = JSON.parse(taskString);
        const { user_id } = task;

        console.log(`Processing task for user ${user_id}`);
        logTaskCompletion(user_id); // Log task completion
      }
    } catch (err) {
      console.error("Error processing task:", err);
    }
  }, 1000); // 1 task per second
}

// Start processing tasks once connected to Redis
redisClient.on("ready", () => {
  processTasks();
});

module.exports = { addTask };
