const lowStkAlertsController = require('../controllers/lowStkAlertsController');
const express = require('express');
const router = express.Router();

router.get('/', lowStkAlertsController.getLowStockProducts);

module.exports = router;