// cartController.js

// Simulated in-memory shopping cart
let cart = [];

// Add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(cartItem => cartItem.id !== itemId);
}

// Update item quantity in cart
function updateCartQuantity(itemId, quantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = quantity;
    }
}

// Get current cart items
function getCart() {
    return cart;
}

// Exporting functions
module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCart
};
