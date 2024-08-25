const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Product Schema
const productSchema = new Schema(
  {
    Product_Name: {
      type: String,
      required: true, // The name of the product must be provided
    },
    Price: {
      type: String, // Store price as a string with currency (e.g., "500EGP")
      required: true, // Price must be provided
    },
    Stock: {
      type: Number, // Stock is represented as a number
      required: true, // Stock must be provided
    },
    Description: {
      type: String, // Description of the product
      required: true, // Description must be provided
    },
    Number_Of_Sales: {
      type: Number, // The number of sales is represented as a number
      default: 0, // Default value is 0 if not provided
    },
    Discount_Percentage: {
      type: String, // Store discount percentage as a string (e.g., "0%")
      required: true, // Discount percentage must be provided
    },
    Category_ID: {
      type: Schema.Types.ObjectId, // References the ID of the category
      ref: "Category", // Assuming you have a Category model
      required: true, // Category ID must be provided
    },
    Images_URL: {
      type: [String], // An array of strings to store URLs of product images
      default: [], // Default is an empty array
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Product Model
const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
