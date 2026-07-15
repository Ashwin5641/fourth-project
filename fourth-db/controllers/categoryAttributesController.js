const categoryAttributesModel = require('../models/categoryAttributesModel');

exports.getAllCategoryAttributes = async (req, res) => {
    try {
        const categoryAttributes = await categoryAttributesModel.getAllCategoryAttributes();

        return res.status(200).json({
            success: true,
            data: categoryAttributes
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createCategoryAttribute = async (req, res) => {
    const {category_id, attribute_id} = req.body;

    if (category_id === null || attribute_id === null) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }

    try {
        const existing = await categoryAttributesModel.getCategoryAttribute(category_id, attribute_id);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Category attribute alraedy exists'
            })
        }

        await categoryAttributesModel.createCategoryAttribute(category_id, attribute_id);

        return res.status(201).json({
            success: true,
            message: 'Category attribute created successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteCategoryAttribute = async (req, res) => {
    const {id} = req.params;

    try {

        const existing = await categoryAttributesModel.getCategoryAttributeById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'No category attribute found'
            })
        } 
        
        await categoryAttributesModel.deleteCategoryAttribute(id);

        return res.status(200).json({
            success: true,
            message: 'Category attribute deleted successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}