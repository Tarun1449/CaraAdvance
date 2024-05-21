const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    sellerId: { type: String, required: true }
});

// Create the Product model
const Product = mongoose.model('Products', productSchema);

module.exports = Product;
