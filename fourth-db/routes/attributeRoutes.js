const attributeController = require('../controllers/attributesController');
const express = require('express');
const router = express.Router();

router.post('/', attributeController.createAttribute);

module.exports = router;