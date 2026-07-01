const categoryController = require('../controllers/categoryController');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;