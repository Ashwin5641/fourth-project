const db = require('../config/db');

const productVariantModel = {

    getCategoryIdByProductId: async (product_id) => {
        const [rows] = await db.query(
            'SELECT category_id FROM products WHERE id = ?',
            [product_id]
        );
        return rows[0]
    },

    getProductBySku: async (sku) => {
        const [rows] = await db.query(
            'SELECT * FROM product_variants WHERE sku = ?',
            [sku]
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

    createProductVariant: async (connection, product_id, sku, price, stock_quantity) => {

        const [result] = await connection.query(
            `
            INSERT INTO product_variants
            (product_id, sku, price, stock_quantity)
            VALUES (?,?,?,?)
            `,
            [product_id, sku, price, stock_quantity]
            );

        return result.insertId;
    },

    createVariantAttributeValue: async (connection, variant_id, attribute_value_id) => {
        await connection.query(
            `
            INSERT INTO variant_attribute_values
            (variant_id, attribute_value_id)
            VALUES (?,?)
            `,
            [variant_id, attribute_value_id]
        );
    },

    getAllProductVariants: async () => {
        const [rows] = await db.query(
            `SELECT 
                pv.id AS variant_id,
                pv.product_id,
                p.name AS product_name, 
                pv.sku, 
                pv.price, 
                pv.stock_quantity,
                a.id AS attribute_id,
                av.id AS attribute_value_id,
                a.name AS attribute_name, 
                av.value AS attribute_value 
            FROM 
                product_variants pv 
            LEFT JOIN 
                products p 
            ON 
                pv.product_id = p.id 
            LEFT JOIN 
                variant_attribute_values vav 
            ON 
                pv.id = vav.variant_id 
            LEFT JOIN 
                attribute_values av 
            ON 
                vav.attribute_value_id = av.id 
            LEFT JOIN 
                attributes a 
            ON 
                av.attribute_id = a.id;
            `
        );
        return rows;
    },

    deleteProductVariant: async (id) => {
        const [result] = await db.query(
            'DELETE FROM product_variants WHERE id = ?',
            [id] 
        );
        return result.affectedRows;
    }
}

module.exports = productVariantModel;