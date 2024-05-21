const SellerRequests = require("../Models/sellersRequests");
const User = require("../Models/userModel");
const mongoose = require('mongoose');
exports.becomeSeller = async(req,res)=>{
    const email = req.userId;
    const { cardNumber ,expirationDate , cvc , address ,city , region , postalCode}  = req.body.sellerdata;
    try{
    const sellerdata = req.body.sellerdata;
    const userEmail = await SellerRequests.findOne({email});
    if(userEmail){
        res.status(401).json({ message: "Your Previous Request is still Pending" });
    }
    
    if (!sellerdata.cardNumber || !sellerdata.expirationDate || !sellerdata.cvc || !sellerdata.address || !sellerdata.city || !sellerdata.region || !sellerdata.postalCode) {
        res.status(401).json({ message: "Fill the Required Fields" });
    
    }
    
    const seller = new SellerRequests({ email,cardNumber ,expirationDate , cvc , address ,city , region , postalCode});
    console.log("This is Seller");
    await seller.save();
    res.status(200).json({ message: "Request has been Submited"});
    }catch(error){
        console.log(error);
    }
}

exports.seller_Requests = async(req,res)=>{
    
    const sellerRequests = await SellerRequests.find({});
    
    res.json(sellerRequests);
}

exports.approve_Seller = async(req,res)=>{
    try {
    const {sellerEmail} = req.body;
    
    await SellerRequests.findOneAndDelete({ email: sellerEmail });
    await User.findOneAndUpdate({ email: sellerEmail }, { isSeller: true });
    
    res.status(200).json({ success: true, message: 'Seller approved successfully.' });
    }catch(error){
        console.log(error);
    }
}
