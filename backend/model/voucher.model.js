const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Voucher Schema
const voucherSchema = new Schema(
  {
    Code: {
      type: String,
      required: true, // Voucher code must be provided
      unique: true, // Ensures that each voucher code is unique
    },
    Discount: {
      type: String, // Store discount as a string (e.g., "30%")
     
    },
    Expiration_Date: {
      type: Date, // Use Date type to represent expiration date
    //   required: true, // Expiration date must be provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Voucher Model
const VoucherModel = mongoose.model("voucher", voucherSchema);

module.exports = VoucherModel;
