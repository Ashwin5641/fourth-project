const attributeController = require('../controllers/attributesController');
const express = require('express');
const router = express.Router();

router.post('/', attributeController.createAttribute);
router.get('/', attributeController.getAllAttributes);
router.delete('/:id', attributeController.deleteAttribute);
router.put('/:id', attributeController.updateAttribute)

module.exports = router;