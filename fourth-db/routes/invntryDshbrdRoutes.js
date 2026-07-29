const invntryDshbrdController = require('../controllers/invntryDshbrdController');
const express = require('express');
const router = express.Router();

router.get('/', invntryDshbrdController.getStockDashboard);
router.put('/product-variant/:variant_id', invntryDshbrdController.updateStockkQuantity);

module.exports = router;