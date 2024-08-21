const { MongoClient } = require('mongodb');

async function main() {
  // Connection URI (replace with your MongoDB connection string)
  const uri = "mongodb+srv://utopiahrzao:owM3cZSE2LcaF4vI@cluster0.ytttcc1.mongodb.net/";

  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Select the database (Utopia)
    const database = client.db('Utopia');

    // Select the collection (e.g., 'users')
    const collection = database.collection('users');


  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);
