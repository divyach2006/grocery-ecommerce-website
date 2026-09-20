const express = require("express");

const {
    createOrder,
    getMyOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create order / checkout
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/", protect, getMyOrders);

module.exports = router;