const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();

router.post('/', productsController.createProducts);
router.get('/', productsController.getAllProducts);
router.delete('/:id', productsController.deleteProducts);
router.put('/:id', productsController.updateProduct);

module.exports = router;