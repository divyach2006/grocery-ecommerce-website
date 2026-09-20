const API_URL = "http://localhost:5000/api";


// Get all products
async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Display products on website
function displayProductList(products) {
    const container = document.getElementById("product-container");

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <div class="box">
                <img src="${product.image}">
                <h1>${product.name}</h1>

                <div class="price">
                    $${product.price}/-
                </div>

                <div class="stars">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>

                <a href="#" class="btn"
                   onclick="addToCart('${product._id}'); return false;">
                    add to cart
                </a>
            </div>
        `;
    });
}

async function displayProducts() {
    const products = await getProducts();
    displayProductList(products);
}

displayProducts();

// Login user
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("token", data.token);

        alert("Login successful!");

        document.getElementById("login-form").reset();

    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong");
    }
});

// Add product to cart
async function addToCart(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: 1
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Product added to cart!");

    } catch (error) {
        console.error("Add to cart error:", error);
    }
}

// Load cart
async function loadCart() {
    const token = localStorage.getItem("token");

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!token) {
        cartItems.innerHTML = "<p>Please login to see your cart.</p>";
        cartTotal.innerHTML = "total : $0/-";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const cart = await response.json();

        if (!response.ok) {
            alert(cart.message);
            return;
        }

        cartItems.innerHTML = "";

        let total = 0;

        cart.items.forEach(item => {
            const product = item.product;
            const itemTotal = product.price * item.quantity;

            total += itemTotal;

            cartItems.innerHTML += `
                <div class="box">
                    <i class="fa fa-trash"
                       onclick="removeFromCart('${product._id}')">
                    </i>

                    <img src="${product.image}">

                    <div class="content">
                        <h3>${product.name}</h3>
                        <span class="price">$${product.price}</span>
           <span class="quantity">
    Qty : ${item.quantity}
</span>

<button onclick="updateCartQuantity('${product._id}', ${item.quantity + 1})">
    +
</button>

<button onclick="updateCartQuantity('${product._id}', ${item.quantity - 1})">
    -
</button>
                    </div>
                </div>
            `;
        });

        cartTotal.innerHTML = `total : $${total.toFixed(2)}/-`;

    } catch (error) {
        console.error("Cart error:", error);
    }
}
loadCart();

// Remove product from cart
async function removeFromCart(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        loadCart();

    } catch (error) {
        console.error("Remove cart error:", error);
    }
}

// Search products
document.getElementById("search-box").addEventListener("input", async function () {

    const searchText = this.value.toLowerCase().trim();

    const products = await getProducts();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );

    displayProductList(filteredProducts);
});

// Update cart quantity
async function updateCartQuantity(productId, quantity) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        loadCart();

    } catch (error) {
        console.error("Update cart error:", error);
    }
}

// Show checkout form
document.getElementById("checkout-btn").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("checkout-form").style.display = "block";
});

// Place order
document.getElementById("place-order-btn").addEventListener("click", async () => {

    const token = localStorage.getItem("token");
    const shippingAddress = document.getElementById("shipping-address").value.trim();

    if (!token) {
        alert("Please login first");
        return;
    }

    if (!shippingAddress) {
        alert("Please enter shipping address");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                shippingAddress: shippingAddress
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Order placed successfully!");

        // Clear checkout form
        document.getElementById("shipping-address").value = "";
        document.getElementById("checkout-form").style.display = "none";

        // Refresh cart
        loadCart();

    } catch (error) {
        console.error("Order error:", error);
        alert("Something went wrong");
    }
});