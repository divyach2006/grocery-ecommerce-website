const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const products = [
    {
        name: "Fresh Carrot",
        price: 12.99,
        image: "image/carrot.jpg",
        category: "Vegetables",
        rating: 4.5,
        description: "Fresh and healthy carrots.",
        stock: 20
    },
    {
        name: "Fresh Ginger",
        price: 12.99,
        image: "image/ginger.jpg",
        category: "Vegetables",
        rating: 4,
        description: "Fresh ginger for daily cooking.",
        stock: 20
    },
    {
        name: "Fresh Lemons",
        price: 12.99,
        image: "image/lemons many.jpg",
        category: "Fruits",
        rating: 4.5,
        description: "Fresh juicy lemons.",
        stock: 20
    },
    {
        name: "Fresh Tomatoes",
        price: 12.99,
        image: "image/tomatoes.jpg",
        category: "Vegetables",
        rating: 5,
        description: "Fresh and organic tomatoes.",
        stock: 20
    },
    {
        name: "Fresh Avocado",
        price: 12.99,
        image: "image/avacoda.jpg",
        category: "Fruits",
        rating: 5,
        description: "Fresh and nutritious avocado.",
        stock: 20
    },
    {
        name: "Fresh Fruits",
        price: 12.99,
        image: "image/all fruits.jpg",
        category: "Fruits",
        rating: 5,
        description: "Fresh seasonal fruits.",
        stock: 20
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Products added successfully!");
        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedProducts();