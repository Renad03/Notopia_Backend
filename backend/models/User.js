const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema; 
// const validator = require('validator'); // Import validator for phone number validation

// // Define a regular expression for password complexity
// const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Define the user schema
const userSchema = new Schema(
    {
      First_Name: {
        type: String,
        required: true,
      },
      Last_Name: {
        type: String,
        required: true,
      },
      Phone_Number: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      Date_Of_Birth: {
        type: Date,
      },
      Gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
       // required: true,
      },
      Wishlist: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product", // Assuming Wishlist items are references to a Product model
        },
      ],
      Cart: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product", // Assuming Cart items are references to a Product model
          },
          quantity: {
            type: Number,
            min: 1,
          },
        },
      ],
      Vouchers: [
        {
          code: {
            type: String,
          },
          discount: {
            type: Number,
          },
          expiryDate: {
            type: Date,
          },
        },
      ],
      Orders_History: [
        {
          orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order", 
          },
          date: {
            type: Date,
          },
          status: {
            type: String,
          },
        },
      ],
      Addresses: [
        {
          street: {
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
          zipCode: {
            type: String,
          },
          country: {
            type: String,
          },
        },
      ],
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );
  

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;
