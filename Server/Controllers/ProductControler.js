// const products = require('../product');
const cloudinary = require("cloudinary")
const  Product = require('../Models/productModel');
exports.getProducts = async(req,res) =>{
    const Products = await Product.find({});
    res.json({Products});
}

exports.getProductsIndx = async(req,res) =>{
    try {
        const index = req.params.index;
        
        const product = await Product.findOne({ _id: index });
        
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addProduct = async(req,res)=>{
    
    const email = req.userId;

    const { title, description, price, images } = req.body;
    images.splice(0,3);
    
    if(!title||!description||!price||!images){
        res.status(400).json({message:"Fill the Required Filds"});
    }
    
    try{
        const product = new Product({
            title,
            description,
            price,
            images,
            sellerId: email
        });
        await product.save();
        res.status(200).json({message:"Product Successfully Added"});
    }   
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.removeProduct = async(req,res)=>{
    
    const {indx} = req.body;

    try{
        const product = Product.findOne({_id:indx});
        await product.deleteOne();
        res.status(200).json({message:"Removed"});
    }   
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
}



