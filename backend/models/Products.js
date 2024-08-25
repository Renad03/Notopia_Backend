const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
name: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
description: {
    type: String,
    required: true,
},
itemsInStock: {
    type: Number,
    required: true,
    default: 0,
},
numberOfSales: {
    type: Number,
    default: 0,
},
discountPercentage: {
    type: Number,
    default: 0,
},
categoryId: {
    type: Schema.Types.ObjectId, // categories  collection
    ref: 'Category', // The name of the Category model
    required: true,
},
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
