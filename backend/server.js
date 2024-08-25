const express = require('express');
const connectToDatabase = require('./config/db');
const app = express();
const PORT = process.env.PORT || 49279;

async function startServer() {
    const db = await connectToDatabase();

    // Now you can use the `db` object to interact with your MongoDB database
    // Example: const usersCollection = db.collection('users');

    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:49279');
    });
}

startServer();
