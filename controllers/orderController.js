const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/product");

// Create Order
const createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }

        const cart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        // Check stock and prepare order items
        for (const item of cart.items) {
            const product = item.product;

            if (!product) {
                return res.status(400).json({
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }

        // Create order
        const order = await Order.create({
            user: req.user,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        // Reduce product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        // Empty cart after successful order
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders
};