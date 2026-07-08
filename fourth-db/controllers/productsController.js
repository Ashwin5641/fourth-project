const productsModel = require('../models/productsModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.getAllProducts();

        return res.status(200).json({
            success: true,
            data: products
        })

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

    if (!name || !slug || !category_id || !brand_id || !short_description || !description || !featured || !status || sort_order === null) {
        return res.status(400).json({
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
            message: 'Product created successfully!'
        })

    } catch (err) { 
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later'
        })
    }
}

exports.deleteProducts = async (req, res) => {
    const {id} = req.params;

    try {
        const deleteProduct = await productsModel.deleteProduct(id);

        if (deleteProduct === 0) {
            return res.status(404).json({
                success: false,
                message: 'No product deleted'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, slug, category_id, brand_id, short_description, description, featured, status, sort_order} = req.body;

    if (!name || !slug || !category_id || !brand_id || !short_description || !description || !featured || !status || sort_order === null) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the required fields'
        })
    }

    try {

        const existing = await productsModel.getProductBySlug(slug);

        if (existing && existing.id !== Number(id)) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists'
            })
        }
        
        const product = await productsModel.updateProduct(
            id, name, slug, category_id, brand_id, short_description, description, featured, status, sort_order
        );

        if (product === 0) {
            return res.status(404).json({
                success: false,
                message: 'No product updated'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}