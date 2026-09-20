const express = require("express");

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/", protect, addToCart);

// Update quantity
router.put("/", protect, updateCartItem);

// Remove product
router.delete("/:productId", protect, removeFromCart);

module.exports = router;