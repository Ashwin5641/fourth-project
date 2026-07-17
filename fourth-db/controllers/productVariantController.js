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