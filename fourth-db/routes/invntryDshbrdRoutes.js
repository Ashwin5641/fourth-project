const invntryDshbrdController = require('../controllers/invntryDshbrdController');
const express = require('express');
const router = express.Router();

router.get('/', invntryDshbrdController.getStockDashboard);

module.exports = router;