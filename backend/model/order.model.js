const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Order Schema
const orderSchema = new Schema(
  {
    User_ID: {
      type: Schema.Types.ObjectId, // References the ID of the user
      ref: "user", // Assuming you have a User model
      required: true, // User ID must be provided
    },
    Products: [
      {
        product: {
          type: Schema.Types.ObjectId, // References the ID of the product
          ref: "Product", // Assuming you have a Product model
          required: true, // Product ID must be provided
        },
        quantity: {
          type: Number, // Quantity of the product ordered
          required: true, // Quantity must be provided
          min: 1, // Minimum quantity is 1
        },
      },
    ],
    Cost: {
      type: String, // Store cost as a string with currency (e.g., "500EGP")
      required: true, // Cost must be provided
    },
    Status: {
      type: String, // Status of the order (e.g., "Delivered")
      required: true, // Status must be provided
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Possible statuses
      default: "Pending", // Default status is 'Pending'
    },
    Date: {
      type: Date, // Use Date type to represent the order date
      required: true, // Date must be provided
      default: Date.now, // Default to the current date
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Order Model
const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
