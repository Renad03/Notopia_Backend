const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("../config/db");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: "uploads",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});
const upload = multer({ storage });

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const uploadFile = upload.single("file");

const getFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).send("No file exists");
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
};

module.exports = { uploadFile, getFile };
