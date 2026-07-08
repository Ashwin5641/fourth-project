const db = require('../config/db');

const productsModel = {

    getAllProducts: async () => {
        const [rows] = await db.query(
            `
            SELECT
                p.id,
                p.name, 
                p.slug, 
                p.category_id, 
                c.name as category_name,
                p.brand_id, 
                b.name as brand_name,
                p.short_description, 
                p.description, 
                p.featured, 
                p.status, 
                p.sort_order 
            FROM products p 
            LEFT JOIN categories c 
            ON p.category_id = c.id 
            LEFT JOIN brands b 
            ON p.brand_id = b.id;
            `
        );
        return rows;
    },

    getProductBySlug: async (slug) => {
        const [rows] = await db.query(
            'SELECT * FROM products WHERE slug = ?',
            [slug]
        );
        return rows[0]
    },

    createProducts: async (name, slug, category_id, brand_id, short_description, description, featured, status, sort_order) => {
        const [result] = await db.query(
            `
            INSERT INTO 
                products (name, slug, category_id, brand_id, short_description, description, featured, status, sort_order)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [name, slug, category_id, brand_id, short_description, description, featured, status, sort_order]
        );
        return result.insertId;
    },

    deleteProduct: async (id) => {
        const [result] = await db.query(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    updateProduct: async (id, name, slug, category_id, brand_id, short_description, description, featured, status, sort_order) => {
        const [result] = await db.query(
            `
            UPDATE 
                products 
            SET
                name = ?,
                slug = ?,
                category_id = ?, 
                brand_id = ?, 
                short_description = ?, 
                description = ?, 
                featured = ?, 
                status = ?, 
                sort_order = ?
                WHERE id = ?
            `,
            [name, slug, category_id, brand_id, short_description, description, featured, status, sort_order, id]
        );
        return result.affectedRows;
    }
}


module.exports = productsModel;