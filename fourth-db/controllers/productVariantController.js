const db = require('../config/db');
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
    const {product_id, sku, price, stock_quantity, attribute_values} = req.body;

    const connection = await db.getConnection();

    if (!product_id || !sku || !price || !stock_quantity) {
        return res.status(400).json({
            success: false,
            message: 'Required all fields'
        })
    }

    try {

        await connection.beginTransaction();

        const existing = await productVariantModel.getProductBySku(sku);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists!'
            })
        }

        const variantId = await productVariantModel.createProductVariant(connection, product_id, sku, price, stock_quantity);

        for (const valueId of Object.values(attribute_values)) {
            await productVariantModel.createVariantAttributeValue(
                connection,
                variantId,
                valueId
            );
        }

        await connection.commit();

        return res.status(200).json({
            success: true,
            message: 'Product variant created successfully!'
        })
        
    } catch (err) {
        console.log(err)
        await connection.rollback();
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    } finally {
        await connection.release();
    }
}