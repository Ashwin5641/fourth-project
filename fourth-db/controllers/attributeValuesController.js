const attributeValuesModel = require('../models/attributeValuesModel');

exports.getAllAttributeValues = async (req, res) => {
    try {
        const attributeValues = await attributeValuesModel.getAllAttributeValues();

        return res.status(200).json({
            success: true,
            data: attributeValues
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createAttributeValue = async (req, res) => {
    const {attribute_id, value} = req.body;

    if (!attribute_id || !value) {
        return res.status(400).json({
            success: false,
            message: 'Fill the required fields'
        })
    }

    try {
        const existing = await attributeValuesModel.getAttributeByValue(value);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Attribute value already exists'
            })
        }

        await attributeValuesModel.createAttributeValue(attribute_id, value);

        return res.status(201).json({
            success: true,
            message: 'Created attribute values successfully!'
        })
    } catch (err) { 
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteAttributeValue = async (req, res) => {
    const {id} = req.params;

    try {
        await attributeValuesModel.deleteAttributeValues(id);

        return res.status(200).json({
            success: true,
            message: 'Attribute value deleted successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.updateAttributeValue = async (req, res) => {
    const {id} = req.params;
    const {attribute_id, value} = req.body;

    if (!attribute_id || !value) {
        return res.status(400).json({
            success: false,
            message: 'Fill the required fields'
        })
    }

    try {
        const existing = await attributeValuesModel.getOtherAttributeValue(id, attribute_id, value);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Attribute value already exists'
            })
        }

        await attributeValuesModel.updateAttributeValues(id, attribute_id, value);

        return res.status(200).json({
            success: true,
            message: 'Attribute value updated successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}