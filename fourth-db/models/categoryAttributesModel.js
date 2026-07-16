const db = require('../config/db');

const categoryAttributesModel = {
    
    getCategoryAttribute: async (category_id, attribute_id) => {
        const [rows] = await db.query(
            'SELECT * FROM category_attributes where category_id = ? AND attribute_id = ?',
            [category_id, attribute_id]
        );
        return rows[0]
    },

    getCategoryAttributeById: async (id) => {
        const [rows] = await db.query(
            `SELECT * FROM category_attributes WHERE id = ?`,
            [id]
        );
        return rows[0]
    },

    getOtherCategoryAttribute: async (id, category_id, attribute_id) => {
        const [rows] = await db.query(
            `
            SELECT 
                *
            FROM
                category_attributes
            WHERE 
                category_id = ?
            AND 
                attribute_id = ?
            AND 
                id <> ?
            `,
            [category_id, attribute_id, id]
        );
        return rows[0]
    },

    createCategoryAttribute: async (category_id, attribute_id) => {
        const [result] = await db.query(
            'INSERT INTO category_attributes (category_id, attribute_id) VALUES (?, ?)',
            [category_id, attribute_id]
        );
        return result.insertId
    },

    deleteCategoryAttribute: async (id) => {
        const [result] = await db.query(
            'DELETE FROM category_attributes WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    getAllCategoryAttributes: async () => {
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
                ca.attribute_id = a.id;
            `
        );
        return rows;
    },

    updateCategoryAttribute: async (id, category_id, attribute_id) => {
        const [result] = await db.query(
            'UPDATE category_attributes SET category_id = ?, attribute_id = ? WHERE id = ?',
            [category_id, attribute_id, id]
        );
        return result.affectedRows;
    }
}

module.exports = categoryAttributesModel;