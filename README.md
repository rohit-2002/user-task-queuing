# User Task Queuing System

## Overview
Welcome to the User Task Queuing System! This Node.js API allows users to queue tasks, enforcing a limit of one task per second per user ID. 
We leverage Redis for efficient task management and ensure robust error handling throughout.

## Features
- **Clustered API**: Runs with two replicas for scalability.
- **Rate Limiting**: One task per second per user.
- **Task Management**: Uses Redis for queuing.
- **Logging**: Tracks task completions with timestamps.

## Getting Started

### Prerequisites
- Node.js (v14+)
- Redis (local or cloud)

### Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/rohit-2002/user-task-queuing.git
   cd user-task-queuing
   
### Install dependencies
 ```bash
 npm install
 ```
- **Start Redis server :** ```bash redis-server ```
- **Running the APIStart the API with**: ```bash node cluster.js ```

### Testing the API with Postman

- **Open Postman and create a new POST request.Set the URL to ```bash  http://localhost:3000/task.``` 
- **Set the request body:**
- **Set Headers:**
- **Click on the "Headers" tab below the URL input bar.**
- **Add a new header:**
- **Key**: ``` bash Content-Type ```
- **Value**: ``` bash application/json ```

- **Enter the Request Body:**
- **Click on the "Body" tab.**
- **Select "raw".**
- **Choose JSON from the dropdown on the right side.**
- **Enter the following JSON in the text area:**
``` bash
{
  "user_id": "123"
}```
- **Send the request.**
- **You should receive a response indicating the task has been queued.**

