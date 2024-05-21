const express = require('express');
const { getProducts,getProductsIndx, addProduct,removeProduct} = require('../Controllers/ProductControler');
const { verifyToken } = require('../Controllers/CartController');
const router = express.Router();

router.get('/getProducts',getProducts);
router.get(`/getProducts/:index`,getProductsIndx);
router.post("/addproduct",verifyToken,addProduct);
router.post("/removeProduct",verifyToken,removeProduct);
module.exports  = router;