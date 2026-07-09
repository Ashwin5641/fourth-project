const productImagesModel = require('../models/productImagesModel');

exports.createProductImages = async (req, res) => {
    console.log(req.body);
    const {product_id, is_primary, sort_order} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!product_id || !is_primary || !sort_order || !image) {
        return res.status(400).json({
            success: false,
            message: 'Fill all the require fields'
        })
    }

    try {
        const checkPrimary = await productImagesModel.getIsPrimary(is_primary);

        if (checkPrimary === is_primary) {
            return res.status(409).json({
                success: false,
                message: 'Primary is already set for another image'
            })
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