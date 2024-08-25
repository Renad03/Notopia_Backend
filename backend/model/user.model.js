const mongoose = require("mongoose");
const db = require("../config/db.js");

const { Schema } = mongoose;

// Define the User Schema
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
      required: true,
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
// userSchema.pre('save', async function(next) {
//     // Only run this function if password was actually modified
//     if (!this.isModified('password')) return next();

//     // Hash the password with cost of 12
//     this.password = await bcrypt.hash(this.password, 12);

//     // Delete passwordConfirm field
//     this.passwordConfirm = undefined;
//     next();
// });
// Create the User Model
const UserModel = db.model("user", userSchema); //collection
module.exports = UserModel;
