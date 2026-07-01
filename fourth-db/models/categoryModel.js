const db = require('../config/db');

const categoryModel = {

    getAllCategories: async () => {
        const [rows] = await db.query(
            'SELECT * FROM categories'
        );
        return rows;
    },

    getCategoryById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM categories WHERE id = ?',
            [id]
        );
        return rows[0]
    },

    getCategoryBySlug: async (slug) => {
        const [rows] = await db.query(
            'SELECT * FROM categories WHERE slug = ?',
            [slug]
        );
        return rows[0]
    },

    createCategory: async (name, slug, parent_id, image, description) => {
        const [result] = await db.query(
            'INSERT INTO categories (name, slug, parent_id, image, description) VALUES (?, ?, ?, ?, ?)',
            [name, slug, parent_id, image, description]
        );
        return result.insertId
    },

    updateCategory: async (id, name, slug, parentId, image, description) => {
        const [result] = await db.query(
            'UPDATE categories SET name = ?, slug = ?, parent_id = ?, image = ?, description = ? WHERE id = ?',
            [name, slug, parentId, image, description, id]
        );
        return result.affectedRows;
    },

    deleteCategory: async (id) => {
        const [result] = await db.query(
            'DELETE FROM categories WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

module.exports = categoryModel;