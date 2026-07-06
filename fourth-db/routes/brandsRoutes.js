const brandController = require('../controllers/brandsController');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')

router.post('/', upload.single('logo') , brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.delete('/:id', brandController.deleteBrand);
router.put('/:id', upload.single('logo') , brandController.updateBrand)

module.exports = router;