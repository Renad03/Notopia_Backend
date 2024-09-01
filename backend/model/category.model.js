const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Category Schema
const categorySchema = new Schema(
  {
    Category_Name: {
      type: String,
      required: true, // The name of the category must be provided
      unique: true, // Ensure each category name is unique
    },
    Category_IMG_URL: {
      type: String, // URL of the category image
      default: "", // Default to an empty string if not provided
    },
    Products: [
      {
        type: Schema.Types.ObjectId, // References the ID of a product
        ref: "product", // Assuming you have a Product model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Category Model
const CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
