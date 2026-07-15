const categoryAttributeController = require('../controllers/categoryAttributesController');
const express = require('express');
const router = express.Router();

router.post('/', categoryAttributeController.createCategoryAttribute);
router.get('/', categoryAttributeController.getAllCategoryAttributes);
router.delete('/:id', categoryAttributeController.deleteCategoryAttribute);

module.exports = router;