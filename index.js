const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const { addTask } = require('./queue');

const app = express();
app.use(bodyParser.json());

// Redis client connection
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

const PORT = 3000;

// API Route for task submission
app.post('/task', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        await addTask(user_id);
        res.send('Task queued');
    } catch (err) {
        console.error('Error queueing task:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = redisClient;
