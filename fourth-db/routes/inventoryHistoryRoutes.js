const invntryHistryController = require('../controllers/inventoryHistoryController');
const express = require('express');
const router = express.Router();

router.get('/', invntryHistryController.getAllInvntryHistry);

module.exports = router;