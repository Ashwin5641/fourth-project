const heroController = require('../controllers/heroController');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.get('/:id', heroController.getHeroById);
router.post('/', upload.single('image'), heroController.addHero);
router.get('/', heroController.getAllHero);
router.delete('/:id', heroController.deleteHero);
router.put('/:id', upload.single('image'), heroController.updateHero);

module.exports = router;