const db = require('../config/db');

const productImagesModel = {
    createProductImages: async (product_id, image, is_primary, sort_order) => {
        const [result] = await db.query(
            'INSERT INTO product_images (product_id, image, is_primary, sort_order) VALUES (?, ?, ?, ?)',
            [product_id, image, is_primary, sort_order]
        );
        return result.insertId;
    },

    getPrimaryImageByProductId: async (product_id) => {
        const [rows] = await db.query(
            `
            SELECT *
                FROM product_images
            WHERE product_id = ?
                AND is_primary = 1;
            `,
            [product_id]
        );
        return rows[0]
    },

    getOtherPrimaryImage: async (product_id, id) => {
        const [rows] = await db.query(
            `
            SELECT * 
                FROM product_images
            WHERE product_id = ?
                AND is_primary = 1
                AND id <> ?
            `,
            [product_id, id]
        );
        return rows[0]
    },

    getProductImageById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM product_images WHERE id = ?',
            [id]
        );
        return rows[0]
    },

    getAllProductImages: async () => {
        const [rows] = await db.query(
            `
            SELECT 
                pi.id, 
                pi.product_id, 
                pi.image, 
                pi.is_primary, 
                pi.sort_order, 
                p.name AS product_name 
            FROM product_images pi 
            LEFT JOIN products p 
            ON pi.product_id = p.id;
            `
        );
        return rows;
    },

    deleteProductImages: async (id) => {
        const [result] = await db.query(
            'DELETE FROM product_images WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    updateProductImage: async (id, product_id, image, is_primary, sort_order) => {
        const [result] = await db.query(
            `UPDATE product_images SET product_id = ?, image = ?, is_primary = ?, sort_order = ? WHERE id = ?`,
            [product_id, image, is_primary, sort_order, id]
        );
        return result.affectedRows;
    }
}

module.exports = productImagesModel;