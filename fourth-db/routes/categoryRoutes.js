const categoryController = require('../controllers/categoryController');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getAllCategoriesWithParent);
router.delete('/:id', categoryController.deleteCategory);
router.put('/:id', upload.single('image'), categoryController.updateCategory)

module.exports = router;