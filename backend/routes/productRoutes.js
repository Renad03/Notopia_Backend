const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/product.controller.js");
//, enctype='multipart/form-data' in pug form
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage: storage });

const base = "/products";
router.get(base, controller.indexController);
router.get(`${base}/create`, controller.renderCreateView);
router.post(`${base}/create`, controller.createProduct);
router.post(base, upload.array("images"), (req, res) => {
  // req.files contains information about the uploaded files
  console.log(req.files);
  // Handle form fields
  console.log(req.body);
  // Save product information to database
  res.send("Form submitted successfully");
});

router.get(`${base}/edit/:id`, controller.productDetails); // Edit view route
router.post(`${base}/edit/:id`, controller.updateProduct); // Update route

router.post(`${base}/delete/:id`, controller.deleteProduct); // Delete route

module.exports = router;
