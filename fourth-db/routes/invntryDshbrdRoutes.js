const invntryDshbrdController = require('../controllers/invntryDshbrdController');
const express = require('express');
const router = express.Router();
const {authenticateToken, isAdmin} = require('../middlewares/authMiddleware')

router.get('/', invntryDshbrdController.getStockDashboard);
router.put('/product-variant/:variant_id', authenticateToken, isAdmin, invntryDshbrdController.updateStockkQuantity);

module.exports = router;