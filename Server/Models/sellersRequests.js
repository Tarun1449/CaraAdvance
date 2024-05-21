const mongoose = require('mongoose');

// Define the schema for SellerRequest
const sellerRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    
});

// Create the SellerRequest model
const SellerRequest = mongoose.model('SellerRequest', sellerRequestSchema);

module.exports = SellerRequest;
