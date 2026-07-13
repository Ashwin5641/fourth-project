const db = require('../config/db');

const attributesModel = {

    getAllAttributes: async () => {
        const [rows] = await db.query(
            'SELECT * FROM attributes'
        );
        return rows;
    },

    getAttributeByName: async (name) => {
        const [rows] = await db.query(
            `SELECT * FROM attributes WHERE name = ?`,
            [name]
        );
        return rows[0]
    },

    getOtherAttribute: async (id, name) => {
        const [rows] = await db.query(
            `SELECT * FROM attributes WHERE name = ? AND id <> ?`,
            [name, id]
        );
        return rows[0]
    },

    createAttribute: async (name) => {
        const [result] = await db.query(
            `INSERT INTO attributes (name) VALUES (?)`,
            [name]
        );
        return result.insertId;
    },

    deleteAttribute: async (id) => {
        const [result] = await db.query(
            'DELETE FROM attributes WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    updateAttribute: async (id, name) => {
        const [result] = await db.query(
            'UPDATE attributes SET name = ? WHERE id = ?',
            [name, id]
        );
        return result.affectedRows;
    },
}

module.exports = attributesModel;