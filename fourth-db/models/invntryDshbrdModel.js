const db = require('../config/db');

const invtryDshbrdModel = {
    getStockDashboard: async (search) => {

        const keyword = `%${search}%`;

        const [rows] = await db.query(
            `
            SELECT 
                pv.id AS variant_id, 
                pv.product_id,
                P.name AS product_name,
                pv.sku,
                pv.price,
                pv.stock_quantity,
                a.id AS attribute_id,
                a.name AS attribute_name,
                av.id AS attribute_value_id,
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
                av.attribute_id = a.id
            WHERE
                p.name LIKE ?
                OR pv.sku LIKE ?
                OR av.value LIKE ?;
            `,
            [keyword, keyword, keyword]
        );
        return rows;
    },

    updateStkQuantity: async (variant_id, stock_quantity) => {
        const [rows] = await db.query(
            'UPDATE product_variants SET stock_quantity WHERE id = ?',
            [stock_quantity, variant_id]
        );
        return rows.affectedRows;
    }
}

module.exports = invtryDshbrdModel;