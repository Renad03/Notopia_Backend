const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // The name of the product must be provided
    },
    price: {
      type: Number, // Store price as a number
      required: true, // Price must be provided
    },
    stock: {
      type: Number, // Stock is represented as a number
      required: true, // Stock must be provided
    },
    description: {
      type: String, // Description of the product
      required: true, // Description must be provided
    },
    number_of_sales: {
      type: Number, // The number of sales is represented as a number
      default: 0, // Default value is 0 if not provided
    },
    discount_percentage: {
      type: Number, // Store discount percentage as a number
      // required: true, // Discount percentage must be provided
    },
    category_id: {
      type: Schema.Types.ObjectId, // References the ID of the category
      ref: "Category", // Assuming you have a Category model
      // required: true, // Category ID must be provided
    },
    images_url: {
      type: [String], // An array of strings to store URLs of product images
      default: [], // Default is an empty array
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ProductModel = mongoose.model("Product", productSchema);

async function createProduct(data) {
  const product = new ProductModel(data);
  return await product.save();
}

module.exports = { ProductModel, createProduct };
