# CodeAlpha Grocery Store

A full-stack grocery store web application developed as part of my CodeAlpha Full Stack Development Internship.

## Features

- User Registration and Login
- JWT Authentication
- Products loaded from MongoDB
- Add products to cart
- Update cart quantity
- Remove products from cart
- Checkout with shipping address
- Order placement
- Automatic stock management
- Order data stored in MongoDB

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
CodeAlpha_GroceryStore/
├── index.html
├── css/
├── js/
├── image/
└── backend/
    ├── server.js
    ├── package.json
    ├── seed.js
    ├── config/
    ├── models/
    ├── routes/
    ├── controllers/
    └── middleware/
How to Run
1. Clone the repository.
2. Open the project in VS Code.
3. Open the backend folder in the terminal.
4. Install dependencies:
npm install
5. Create a .env file inside the backend folder with your MongoDB connection string and JWT secret.
6. Start the server:
node server.js
7. Open:
http://localhost:5000
Internship
This project was developed as part of my Full Stack Development Internship at CodeAlpha.
Author
Divya Chauhan
