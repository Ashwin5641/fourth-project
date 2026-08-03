const db = require('../config/db');

const lowStckAlertModel = {
    getLowStockProducts: async (search, page, sort, limit) => {
        const keyword = `%${search}%`

        const offset = (page - 1) * limit

        let orderBy = `pv.stock_quantity ASC`

        if (sort === 'oldest') {
            orderBy = 'pv.stock_quantity DESC'
        } 
        
        if (sort === 'product_asc') {
            orderBy = 'p.name ASC'
        }

        if (sort === 'product_desc') {
            orderBy = 'p.name DESC'
        }

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
                AND (
                    p.name LIKE ?
                    OR pv.sku LIKE ?
                )
            ORDER BY 
                ${orderBy}
            LIMIT ? 
            OFFSET ?
            `,
            [keyword, keyword, limit, offset]
        );

        const [[count]] = await db.query(
            `
            SELECT COUNT(*) AS total 
            FROM 
                product_variants pv
            LEFT JOIN 
                products p
            ON 
                p.id = pv.product_id
            WHERE
                pv.stock_quantity <= pv.minimum_stock
                AND (
                    p.name LIKE ?
                    OR pv.sku LIKE ?
                )
            `,
            [keyword, keyword]
        )

        return {
            rows,
            total: count.total
        };
    }
}

module.exports = lowStckAlertModel;