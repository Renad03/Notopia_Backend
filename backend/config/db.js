const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://utopiahrzao:owM3cZSE2LcaF4vI@cluster0.ytttcc1.mongodb.net/Utopia';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'Utopia';

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    // Select the database
    const db = client.db(dbName);

    // You can now perform operations on the database
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Export the connect function to use it in other parts of your app
module.exports = connectToDatabase;
