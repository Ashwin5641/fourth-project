const lowStckAlertModel = require('../models/lowStockAlertsModel');
const {lowStockAlert} = require('../services/inventoryService')

exports.getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await lowStckAlertModel.getLowStockProducts();

        const products = lowStockProducts.map(product => ({
            ...product,
            status: lowStockAlert(product.stock_quantity, product.minimum_stock)
        }))
        
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}