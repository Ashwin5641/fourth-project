const db = require('../config/db');

const heroModel = {
    createHero: async (title, subtitle, image, button_text, button_url ) => {
        const [result] = await db.query(
            'INSERT INTO hero_slides (title, subtitle, image, button_text, button_url) VALUES (?, ?, ?, ?, ?)',
            [title, subtitle, image, button_text, button_url]
        );
        return result.insertId
    },

    getAllHero: async () => {
        const [rows] = await db.query(
            'SELECT * FROM hero_slides WHERE is_active = true ORDER BY id DESC'
        );
        return rows;
    }
}

module.exports = heroModel;