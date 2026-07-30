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

    updateStkQuantity: async (connection, variant_id, performOperation) => {
        const [result] = await connection.query(
            'UPDATE product_variants SET stock_quantity = ? WHERE id = ?',
            [performOperation, variant_id]
        );
        return result.affectedRows;
    },

    createStockMovement: async (connection, variant_id, operation, stock_quantity, quantity, performOperation, reason, created_by) => {
        await connection.query(
            `
            INSERT INTO stock_movements (variant_id, operation, previous_quantity, quantity_changed, new_quantity, reason, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [variant_id, operation, stock_quantity, quantity, performOperation, reason, created_by]
        )
    }
}

module.exports = invtryDshbrdModel;