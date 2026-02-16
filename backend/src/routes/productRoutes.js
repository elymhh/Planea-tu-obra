'use strict';

const express = require('express');
const router = express.Router();

// Mock data for demonstration purposes
const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 150 }
];

// Search products
router.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    res.json(filteredProducts);
});

// Get product details
router.get('/details/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(product => product.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Price comparison
router.get('/compare', (req, res) => {
    const ids = req.query.ids.split(',').map(id => parseInt(id, 10));
    const comparedProducts = products.filter(product => ids.includes(product.id));
    res.json(comparedProducts);
});

module.exports = router;