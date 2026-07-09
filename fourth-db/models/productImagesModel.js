const db = require('../config/db');

const productImagesModel = {
    createProductImages: async (product_id, image, is_primary, sort_order) => {
        const [result] = await db.query(
            'INSERT INTO product_images (product_id, image, is_primary, sort_order) VALUES (?, ?, ?, ?)',
            [product_id, image, is_primary, sort_order]
        );
        return result.insertId;
    },

    getIsPrimary: async (is_primary) => {
        const [rows] = await db.query(
            'SELECT * FROM product_images WHERE is_primary = ?',
            [is_primary]
        );
        return rows[0]
    }
}

module.exports = productImagesModel;