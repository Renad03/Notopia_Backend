const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Address Schema
const addressSchema = new Schema(
  {
    Street: {
      type: String,
      required: true, // The street name or number must be provided
    },
    Appartment_Number: {
      type: String, // The apartment number
      required: true, // Apartment number must be provided
    },
    Floor: {
      type: String, // The floor number
      required: true, // Floor number must be provided
    },
    Building_Number: {
      type: String, // The building number
      required: true, // Building number must be provided
    },
    Location_Type: {
      type: String, // The type of location (e.g., "Home", "Office")
      required: true, // Location type must be provided
      enum: ["Home", "Office", "Other"], // Restrict to specific types
      default: "Home", // Default to 'Home' if not specified
    },
    Label: {
      type: String, // Optional label for the address
      default: "", // Default to an empty string if not provided
    },
    District: {
      type: String,
      required: true, // The district or neighborhood
    },
    User_ID: {
      type: Schema.Types.ObjectId, // References the ID of the user
      ref: "user", // Assuming you have a User model
      required: true, // User ID must be provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Address Model
const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
