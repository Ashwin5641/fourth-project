const productVariantModel = require('../models/productVariantModel');

exports.getProductAttributes = async (req, res) => {
    const {product_id} = req.params;

    try {
        const categoryId = await productVariantModel.getCategoryIdByProductId(product_id);

        const attributes = await productVariantModel.getCategoryAttributes(categoryId.category_id);

        const ids = attributes.map(a => a.attribute_id);

        const values = await productVariantModel.getAttributeValues(ids);

        const result = attributes.map(attribute => ({
            ...attribute,
            values: values.filter(
                value => value.attribute_id === attribute.attribute_id
            )
        }));

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}

exports.createProductVariants = async (req, res) => {
    const {product_id, sku, price, stock_quantity} = req.body;

    if (!product_id || !sku || !price || !stock_quantity) {
        return res.status(400).json({
            success: false,
            message: 'Required all fields'
        })
    }

    try {
        const existing = await productVariantModel.getCategoryIdByProductId(product_id);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists!'
            })
        }

        await productVariantModel.createProductVariant(product_id, sku, price, stock_quantity);

        return res.status(200).json({
            success: true,
            message: 'Product variant created successfully!'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}