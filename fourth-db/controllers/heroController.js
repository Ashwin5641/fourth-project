const heroModel = require('../models/heroModel');

exports.addHero = async (req, res) => {
    const {title, subtitle, button_text, button_url} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !subtitle || !image || !button_text || !button_url) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the missing fields'
        })
    }

    try {
        const hero = await heroModel.createHero(title, subtitle, image, button_text, button_url);

        return res.status(201).json({
            success: true,
            message: 'Added successfully',
            data: hero
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.getAllHero = async (req, res) => {
    try {
        const heroes = await heroModel.getAllHero();

        if (heroes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No slides found'
            })
        } else {
            return res.status(200).json({
                success: true,
                data: heroes
            })
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later'
        })
    }
}

exports.updateHero = async (req, res) => {
    const {id} = req.params;
    const {title, subtitle, button_text, button_url} = req.body;
    let image;

    if (req.file) {
        image = req.file.filename
    } else {
        image = req.body.image
    }

    try {
        const result = await heroModel.updateHero(id, title, subtitle, image, button_text, button_url);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hero found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Hero updated successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteHero = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await heroModel.deleteHero(id);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'Hero not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Hero deleted successfully'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later'
        })
    }
}