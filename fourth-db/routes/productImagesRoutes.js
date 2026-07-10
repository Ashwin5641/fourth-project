const productImagesController = require('../controllers/productImagesController');
const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/', upload.single('image'), productImagesController.createProductImages);
router.get('/', productImagesController.getAllProductImages);
router.delete('/:id', productImagesController.deleteProductImages);
router.put('/:id', upload.single('image'), productImagesController.updateProductImages)

module.exports = router;