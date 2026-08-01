const db = require('../config/db');

const lowStckAlertModel = {
    getLowStockProducts: async () => {
        const [rows] = await db.query(
            `
            SELECT 
                pv.id,
                p.name AS product_name,
                pv.sku,
                pv.stock_quantity,
                pv.minimum_stock
            FROM 
                product_variants pv
            LEFT JOIN 
                products p
            ON 
                p.id = pv.product_id
            WHERE
                pv.stock_quantity <= pv.minimum_stock
            ORDER BY 
                pv.stock_quantity ASC
            `
        );
        return rows;
    }
}

module.exports = lowStckAlertModel;