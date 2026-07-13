const db = require('../config/db');

const attributeValues = {
    createAttributeValue: async (attribute_id, value) => {
        const [result] = await db.query(
            'INSERT INTO attribute_values (attribute_id, value) VALUES (?, ?)',
            [attribute_id, value]
        );
        return result.insertId;
    },

    getAttributeByValue: async (value) => {
        const [rows] = await db.query(
            `SELECT * FROM attribute_values WHERE value = ?`,
            [value]
        );
        return rows[0];
    },

    getAllAttributeValues: async () => {
        const [rows] = await db.query(
            `
            SELECT 
                av.id, 
                av.attribute_id, 
                a.name As attribute_name, 
                av.value,
                av.created_at, 
                av.updated_at 
            FROM 
                attribute_values av 
            LEFT JOIN attributes a 
            ON av.attribute_id = a.id;
            `
        );
        return rows;
    },

    deleteAttributeValues: async (id) => {
        const [result] = await db.query(
            'DELETE FROM attribute_values WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    getOtherAttributeValue: async (id, attribute_id, value) => {
        const [rows] = await db.query(
            'SELECT * FROM attribute_values WHERE attribute_id = ? AND value = ? AND id <> ?',
            [attribute_id, value, id]
        );
        return rows[0]
    },

    updateAttributeValues: async (id, attribute_id, value) => {
        const [result] = await db.query(
            'UPDATE attribute_values SET attribute_id = ?, value = ? WHERE id = ?',
            [attribute_id, value, id]
        );
        return result.affectedRows;
    }
}

module.exports = attributeValues;