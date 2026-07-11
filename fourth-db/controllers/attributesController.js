const attributesModel = require('../models/attributesModel');

exports.createAttribute = async (req, res) => {
    const {name} = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Attribute required'
        })
    }

    try {
        const existing = await attributesModel.getAttributeByName(name);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Attribute already exist!'
            })
        }

        await attributesModel.createAttribute(name);

        return res.status(201).json({
            success: true,
            message: 'Attributed successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}