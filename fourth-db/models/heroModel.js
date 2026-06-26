const db = require('../config/db');

const heroModel = {

    getHeroById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM hero_slides WHERE id = ?',
            [id]
        );
        return rows[0]
    },

    getAllHero: async () => {
        const [rows] = await db.query(
            'SELECT * FROM hero_slides ORDER BY id DESC'
        );
        return rows;
    },

    createHero: async (title, subtitle, image, button_text, button_url ) => {
        const [result] = await db.query(
            'INSERT INTO hero_slides (title, subtitle, image, button_text, button_url) VALUES (?, ?, ?, ?, ?)',
            [title, subtitle, image, button_text, button_url]
        );
        return result.insertId
    },

    updateHero: async (id, title, subtitle, image, button_text, button_url) => {
        const [result] = await db.query(
            'UPDATE hero_slides SET title = ?, subtitle = ?, image = ?, button_text = ?, button_url = ? WHERE id = ?',
            [title, subtitle, image, button_text, button_url, id]
        );
        return result.affectedRows;
    },

    deleteHero: async (id) => {
        const [result] = await db.query(
            'DELETE FROM hero_slides WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

module.exports = heroModel;