const db = require('../config/db');

const productVariantModel = {
    getCategoryIdByProductId: async (product_id) => {
        const [rows] = await db.query(
            'SELECT category_id FROM products WHERE id = ?',
            [product_id]
        );
        return rows[0]
    },

    getAttributeValues: async (attributeIds) => {
        const [rows] = await db.query(
            `
            SELECT
                id,
                attribute_id,
                value
            FROM 
                attribute_values
            WHERE 
                attribute_id IN (?);
            `,
            [attributeIds]
        );

        return rows;
    },

    getCategoryAttributes: async (category_id) => {
        const [rows] = await db.query(
            `
            SELECT 
                ca.id, 
                ca.category_id, 
                c.name AS category_name, 
                ca.attribute_id, 
                a.name AS attribute_name 
            FROM 
                category_attributes ca 
            LEFT JOIN 
                categories c 
            ON 
                ca.category_id = c.id 
            LEFT JOIN 
                attributes a 
            ON 
                ca.attribute_id = a.id 
            WHERE 
                category_id = ?;
            `,
            [category_id]
        );
        return rows;
    },

    createProductVariant: async (product_id, sku, price, stock_quantity) => {
        const [result] = await db.query(
            'INSERT INTO product_variants (product_id, sku, price, stock_quantity) VALUES (?, ?, ?, ?)',
            [product_id, sku, price, stock_quantity]
        );
        return result.insertId;
    }
}

module.exports = productVariantModel;