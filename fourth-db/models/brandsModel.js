const db = require('../config/db');

const brandsModel = {

    getBrandById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM brands WHERE id = ?',
            [id]
        );
        return rows[0]
    },

    getBrandBySlug: async (slug) => {
        const [rows] = await db.query(
            'SELECT * FROM brands WHERE slug = ?',
            [slug]
        );
        return rows[0]
    },

    getAllBrands: async (search) => {
        const keyword = `%${search}%`

        const [rows] = await db.query(
            'SELECT * FROM brands WHERE name LIKE ? OR slug LIKE ?',
            [keyword, keyword]
        );
        return rows;
    },

    createBrand: async (name, slug, logo, description) => {
        const [result] = await db.query(
            'INSERT INTO brands (name, slug, logo, description) VALUES (?, ?, ?, ?)',
            [name, slug, logo, description]
        );
        return result.insertId;
    },

    deleteBrand: async (id) => {
        const [result] = await db.query(
            'DELETE FROM brands WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    updateBrand: async (id, name, slug, logo, description) => {
        const [result] = await db.query(
            'UPDATE brands SET name = ?, slug = ?, logo = ?, description = ? WHERE id = ?',
            [name, slug, logo, description, id]
        );
        return result.affectedRows;
    }
}

module.exports = brandsModel;