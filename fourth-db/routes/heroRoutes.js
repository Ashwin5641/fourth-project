const heroController = require('../controllers/heroController');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), heroController.addHero);
router.get('/', heroController.getAllHero);

module.exports = router;