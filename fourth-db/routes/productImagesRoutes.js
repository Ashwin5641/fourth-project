const productImagesController = require('../controllers/productImagesController');
const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/', upload.single('image'), productImagesController.createProductImages);

module.exports = router;