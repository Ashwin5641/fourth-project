const productsModel = require('../models/productsModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.getAllProducts();

        if (products) {
            return res.status(200).json({
                success: true,
                data: products
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'No products found'
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createProducts = async (req, res) => {
    const {name, slug, category_id, brand_id, short_description, description, featured, status, sort_order} = req.body;

    if (!name || !slug || !category_id || !brand_id || !short_description || !description || !featured || !status || !sort_order) {
        return res.status(401).json({
            success: false,
            message: 'Fill all the required fields'
        })
    }

    try {
        const existing = await productsModel.getProductBySlug(slug);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists'
            })
        }

        const result = await productsModel.createProducts(
            name, slug, category_id, brand_id, short_description, description, featured, status, sort_order
        );

        return res.status(201).json({
            success: true,
            message: 'Product craeted successfully!'
        })

    } catch (err) { 
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later'
        })
    }
}