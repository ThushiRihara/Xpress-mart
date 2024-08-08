// navbar.js

// Get the hamburger menu icon
const menuIcon = document.getElementById('menu-bar');

// Get the navbar
const navbar = document.getElementById('navbar');

// Toggle the "active" class on click
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


//order page.js

// Cart and Favorites arrays
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Check if the cart was initialized during this session
if (!sessionStorage.getItem('cartInitialized')) {
    // Clear the cart in localstorage when the page is first loaded in a new session
    localStorage.removeItem('cart');
    cart = [];
    sessionStorage.setItem('cartInitialized', 'true');
}

// Add items to cart
function addToCart(itemName, itemId, itemPrice) {
    const quantityInput = document.getElementById(itemId);
    const quantity = parseFloat(quantityInput.value);

    if (quantity > 0) {
        const cartItem = cart.find(item => item.name === itemName);
        
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, quantity, price: itemPrice, total: itemPrice * quantity });
        }

        updateCartTable();
        quantityInput.value = '';
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Update cart table and total price
function updateCartTable() {
    const cartTableBody = document.querySelector("#cart-table tbody");
    cartTableBody.innerHTML = ''; 

    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs ${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart('${item.name}')">Delete</button></td>`;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Rs ${totalPrice.toFixed(2)}`;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Save the current cart as favorites
function saveToFavorites() {
    favorites = [...cart];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Items saved to favorites!");
}

// Apply favorites to the cart and table
function applyFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    
    if (storedFavorites) {
        cart = storedFavorites;
        updateCartTable();
        alert("Favorites applied to the cart!");
    } else {
        alert("No favorites found!");
    }
}

// Function to proceed to payment
function proceedToPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to payment.");
        return;
    }
    // Save the cart to localStorage before proceeding
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = './payment.html';
}

// Adding event listener to the payment button
document.querySelector(".btn").addEventListener("click", proceedToPayment);

// Load cart data and update table when the page loads
document.addEventListener("DOMContentLoaded", updateCartTable);

// Function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartTable();
}
