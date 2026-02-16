'use strict';

const express = require('express');
const router = express.Router();

// Dummy data for illustration
let cartItems = [];

// Get all items in the cart
router.get('/', (req, res) => {
    res.json(cartItems);
});

// Add an item to the cart
router.post('/', (req, res) => {
    const newItem = req.body;
    cartItems.push(newItem);
    res.status(201).json(newItem);
});

// Remove an item from the cart
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
    cartItems = cartItems.filter(item => item.id !== itemId);
    res.status(204).send();
});

module.exports = router;
