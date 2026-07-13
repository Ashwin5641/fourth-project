const attrtibuteValuesController = require('../controllers/attributeValuesController');
const express = require('express');
const router = express.Router();;

router.post('/', attrtibuteValuesController.createAttributeValue);
router.get('/', attrtibuteValuesController.getAllAttributeValues);
router.delete('/:id', attrtibuteValuesController.deleteAttributeValue);
router.put('/:id', attrtibuteValuesController.updateAttributeValue);

module.exports = router;