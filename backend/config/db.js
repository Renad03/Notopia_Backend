const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://utopiahrzao:owM3cZSE2LcaF4vI@cluster0.ytttcc1.mongodb.net/Utopia"; //database :utopia
// const connection = mongoose
//   .createConnection(uri)
//   .on("open", () => {
//     console.log("mangaaaa connectedd");
//   })
//   .on("error", () => {
//     console.log("yalahwyyy mangaa fasal");
//   });
// module.exports = connection;
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName: "Utopia",
    });
    console.log(`Connect to Utopia db ${uri}`);
    
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
