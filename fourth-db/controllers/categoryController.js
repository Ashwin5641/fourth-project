const categoryModel = require('../models/categoryModel');
const path = require('path');
const fs = require('fs')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();

        return res.status(200).json({
            success: true,
            data: categories
        })
    } catch (err) {
        console.error(err)
    }
}

exports.createCategory = async (req, res) => {
    const {name, slug, parent_id, description} = req.body;
    const parentId = parent_id || null;
    const image = req.file ? req.file.filename : null;

    if (!name || !slug || !image) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the required fields!'
        })
    }

    try {
        const existing = await categoryModel.getCategoryBySlug(slug);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists'
            })
        }

        const result = await categoryModel.createCategory(name, slug, parentId, image, description);

        return res.status(201).json({
            success: true,
            message: 'Category created successfully!',
            result
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteCategory = async (req, res) => {
    const {id} = req.params;

    try {

        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'No category found'
            })
        }

        const result = await categoryModel.deleteCategory(id);

        if (category.image) {
            const imagePath = path.join(__dirname, '../uploads', category.image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully!'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}