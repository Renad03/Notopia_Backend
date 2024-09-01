const mongoose = require("mongoose");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
      required: true,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product", // Assuming Wishlist items are references to a Product model
      },
    ],
    cart: [
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
    vouchers: [
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
    orders_history: [
      {
        order_id: {
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
    addresses: [
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
// Hash the password with cost of 12
userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.hash(user.password, 12);
    const haspass = await bcrypt.hash(user.password, salt);
    user.password=haspass;
  } catch (e) {
    throw e;
  }
});

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
