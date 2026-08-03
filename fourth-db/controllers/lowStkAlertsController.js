const lowStckAlertModel = require('../models/lowStockAlertsModel');
const {lowStockAlert} = require('../services/inventoryService')

exports.getLowStockProducts = async (req, res) => {
    const {search = '', page = 1, sort = 'newest', limit = 10} = req.query;

    try {
        const lowStockProducts = await lowStckAlertModel.getLowStockProducts(search, Number(page), sort, Number(limit));

        const products = lowStockProducts.rows.map(product => ({
            ...product,
            status: lowStockAlert(product.stock_quantity, product.minimum_stock),
        }))
        
        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(lowStockProducts.total / limit),
                totalRecords: lowStockProducts.total
            }
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}