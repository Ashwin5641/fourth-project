const db = require('../config/db');

const attributesModel = {
    getAttributeByName: async (name) => {
        const [rows] = await db.query(
            `SELECT * FROM attributes WHERE name = ?`,
            [name]
        );
        return rows[0]
    },

    createAttribute: async (name) => {
        const [result] = await db.query(
            `INSERT INTO attributes (name) VALUES (?)`,
            [name]
        );
        return result.insertId;
    }
}

module.exports = attributesModel;