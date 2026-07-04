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
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'please try again later'
        })
    }
}

exports.getCategoryById = async (req, res) => {
    const {id} = req.params;

    try {
        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'No category found'
            })
        }

        return res.status(200).json({
            success: true,
            data: category
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
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

exports.getAllCategoriesWithParent = async (req, res) => {
    try {
        const categoryWithParent = await categoryModel.getAllCategoriesWithParent();

        return res.status(200).json({
            success: true,
            data: categoryWithParent
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name, slug, parent_id, description} = req.body;
    const parentId = parent_id || null;

    try {
        const existingCategory = await categoryModel.getCategoryById(id);

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'No category found'
            })
        }

        let image = existingCategory.image;

        if (req.file) {
            image = req.file.filename;

            if (existingCategory.image) {
                const oldImagePath = path.join(__dirname, '../uploads', existingCategory.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath)
                }
            }
        }

        const result = await categoryModel.updateCategory(id, name, slug, parentId, image, description);

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}