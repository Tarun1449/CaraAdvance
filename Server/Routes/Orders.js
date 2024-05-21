const express = require('express');
const {verifyToken} = require("../Controllers/CartController");
const {makeOrders} = require("../Controllers/OrdersController")

const router = express.Router();
router.post("/makeOrders",verifyToken,makeOrders);

module.exports = router;