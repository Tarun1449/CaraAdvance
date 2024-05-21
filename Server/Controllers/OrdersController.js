const Order  = require('../Models/orderModel');
const mongoose = require("mongoose");
const User = require("../Models/userModel")
exports.makeOrders = async(req,res) =>{
    try {
        const email = req.userId;
        
        // Check if all required fields are present in the request body
        const { name, address, city, postalCode, products, date ,state,total} = req.body.shippingData;
        
        if (!name || !email || !address || !city || !postalCode || !products || !date||!state ||!total|| products.length === 0) {
            return res.status(400).json({ message: `Fill all required fields` });
        }

        // Create a new Order document based on the request body
        const newOrder = new Order({ name, address, city, postalCode, products, date,state,total });
        
        const savedOrder = await newOrder.save();
        const orderId = savedOrder._id;
        const orderIdObject =  new mongoose.Types.ObjectId(orderId);
        
        // Find the user and update their cart and orders
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Clear the cart and add the new order to the orders array
        user.cart = [];
        
        user.orders.push({ name, address, city, postalCode, products, date,state, id: orderIdObject,total});
        user.markModified('orders');
        await user.save();
        res.status(201).json({order :savedOrder , cart:user.cart});
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}
