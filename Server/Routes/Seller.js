const express = require("express");
const { verifyToken } = require("../Controllers/CartController");
const { becomeSeller, seller_Requests, approve_Seller } = require("../Controllers/SellerController");
const router = express.Router();

router.post("/become-seller",verifyToken,becomeSeller);
router.get("/seller-requests",verifyToken,seller_Requests);
router.post("/seller-approve",verifyToken,approve_Seller);

module.exports = router;