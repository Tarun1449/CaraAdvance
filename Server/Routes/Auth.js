const express = require('express');
const router = express.Router();
const {createUser,loginUser,Check,logout,details} = require('../Controllers/AuthControler');
const { verifyToken } = require('../Controllers/CartController');

router.post('/signup',createUser);
router.post('/login',loginUser);
router.post('/verifyToken',Check);
router.get('/logout',logout);
router.post("/details",verifyToken,details);
module.exports  = router;