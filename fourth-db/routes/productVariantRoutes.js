const productVariantController = require('../controllers/productVariantController');
const express = require('express');
const router = express.Router();

router.get('/product/:product_id/attributes', productVariantController.getProductAttributes);

module.exports = router;