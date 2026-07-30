const db = require('../config/db');

const invntryHistryModel = {
    getAllInvntryHistry: async (search, page, limit, sort) => {
        const keyword = `%${search}%`;

        const offset = (page - 1) * limit;

        let orderBy = "sm.created_at DESC";

        if (sort === "oldest") {
            orderBy = "sm.created_at ASC";
        }

        if (sort === "product_asc") {
            orderBy = "p.name ASC";
        }

        if (sort === "product_desc") {
            orderBy = "p.name DESC";
        }

        const [rows] = await db.query(
            `
            SELECT 
                sm.id, 
                sm.variant_id,
                p.name AS product,
                pv.sku,
                sm.operation,
                sm.previous_quantity,
                sm.quantity_changed,
                sm.new_quantity,
                sm.reason,
                sm.created_by,
                sm.created_at,
                u.name AS user_name
            FROM 
                stock_movements sm
            LEFT JOIN 
                product_variants pv
            ON 
                pv.id = sm.variant_id
            LEFT JOIN 
                products p
            ON 
                pv.product_id = p.id
            LEFT JOIN 
                users u
            ON 
                u.id = sm.created_by
            WHERE 
                p.name LIKE ?
                OR pv.sku LIKE ?
                OR sm.reason LIKE ?
            ORDER BY
                ${orderBy}
            LIMIT ?
            OFFSET ?
            `,
            [keyword, keyword, keyword, limit, offset]
        );
        
        const [[count]] = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM stock_movements sm
            LEFT JOIN product_variants pv
                ON pv.id = sm.variant_id
            LEFT JOIN products p
                ON pv.product_id = p.id
            WHERE
                p.name LIKE ?
                OR pv.sku LIKE ?
                OR sm.reason LIKE ?
            `,
            [keyword, keyword, keyword]
        );

        return {
            rows,
            total: count.total
        };
    }
}

module.exports = invntryHistryModel;