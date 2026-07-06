const brandsModel = require('../models/brandsModel');
const path = require('path');
const fs = require('fs')

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await brandsModel.getAllBrands();

        return res.status(200).json({
            success: true,
            data: brands
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createBrand = async (req, res) => {
    const {name, slug, description} = req.body;
    let logo = req.file ? req.file.filename : null;
    
    if (!name || !slug || !logo || !description) {
        return res.status(401).json({
            success: false,
            message: 'Fill all the require fields'
        })
    }

    try {
        const existing = await brandsModel.getBrandBySlug(slug);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Brand already exists'
            })
        }

        const brand = await brandsModel.createBrand(name, slug, logo, description);

        return res.status(201).json({
            success: true,
            message: 'Brand create successfully',
            brand
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.deleteBrand = async (req, res) => {
    const {id} = req.params;

    try {
        const brand = await brandsModel.getBrandById(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'No brand found'
            })
        }

        const result = await brandsModel.deleteBrand(id);

        if (brand.logo) {
            const imagePath = path.join(__dirname, '../uploads', brand.logo);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Brand deleted successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.updateBrand = async (req, res) => {
    const {id} = req.params;
    const {name, slug, description} = req.body;

    try {
        const existingBrand = await brandsModel.getBrandById(id);

        if (!existingBrand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            })
        }

        let logo = existingBrand.logo;

        if (req.file) {
            logo = req.file.filename;

            if (existingBrand.logo) {
                const oldImagePath = path.join(__dirname, '../uploads', existingBrand.logo);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath)
                }
            }
        }

        const result = await brandsModel.updateBrand(id, name, slug, logo, description);

        return res.status(200).json({
            success: true,
            message: 'Brand updated successfully!',
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}