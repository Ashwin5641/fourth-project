const productImagesModel = require('../models/productImagesModel');
const path = require('path');
const fs = require('fs')

exports.getAllProductImages = async (req, res) => {
    try {
        const product_images = await productImagesModel.getAllProductImages();

        return res.status(200).json({
            success: true,
            data: product_images
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createProductImages = async (req, res) => {
    const {product_id, is_primary, sort_order} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!product_id || is_primary == null || sort_order == null || !image) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the require fields'
        })
    }

    try {
        const primary = await productImagesModel.getPrimaryImageByProductId(product_id);

        if (primary && Number(is_primary) === 1) {
            return res.status(409).json({
                success: false,
                message: "This product already has a primary image."
            });
        }

        await productImagesModel.createProductImages(product_id, image, is_primary, sort_order);

        return res.status(201).json({
            success: true,
            message: 'Product image added successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteProductImages = async (req, res) => {
    const {id} = req.params;

    try {
        const existing = await productImagesModel.getProductImageById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'No product image found'
            })
        }

        const productImage = await productImagesModel.deleteProductImages(id);

        if (existing.image) {
            const imagePath = path.join(__dirname, '../uploads', existing.image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Product image delete successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.updateProductImages = async (req, res) => {
    const {id} = req.params;
    const {product_id, is_primary, sort_order} = req.body;

    if (!product_id || is_primary === 0 || sort_order === 0) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the required fields'
        })
    }

    try {
        const primary = await productImagesModel.getOtherPrimaryImage(
            product_id,
            id
        );

        if (primary && Number(is_primary) === 1) {
            return res.status(409).json({
                success: false,
                message: "This product already has a primary image."
            });
        }

        const existing = await productImagesModel.getProductImageById(id)

        let image = existing.image;

        if (req.file) {
            image = req.file.filename;

            if (existing.image) {
                const oldImagePath = path.join(__dirname, '../uploads', existing.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath)
                }
            }
        }

        await productImagesModel.updateProductImage(id, product_id, image, is_primary, sort_order);

        return res.status(200).json({
            success: true,
            message: 'Product image updated successfully'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}