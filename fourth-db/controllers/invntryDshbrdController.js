const invtryDshbrdModel = require('../models/invntryDshbrdModel');
const inventoryService = require('../services/inventoryService');

exports.getStockDashboard = async (req, res) => {
    const {search = ''} = req.query;

    try {
        const stocks = await invtryDshbrdModel.getStockDashboard(search);

        const grouped = Object.values(
            stocks.reduce((groupedStock, row) => {
                if (!groupedStock[row.variant_id]) {
                    groupedStock[row.variant_id] = {
                        variant_id: row.variant_id,
                        product_id: row.product_id,
                        product_name: row.product_name,
                        sku: row.sku,
                        price: row.price,
                        stock_quantity: row.stock_quantity,
                        stock_status: inventoryService.getStockStatus(row.stock_quantity),
                        attributes: []
                    }
                }

                groupedStock[row.variant_id].attributes.push({
                    attribute_id: row.attribute_id,
                    attribute_name: row.attribute_name,
                    attribute_value_id: row.attribute_value_id,
                    attribute_value: row.attribute_value
                });

                return groupedStock;
            }, {})
        ) 

        return res.status(200).json({
            success: true,
            data: grouped
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later'
        })
    }
}

exports.updateStockkQuantity = async (req, res) => {
    const {variant_id} = req.params;
    const {stock_quantity, quantity, operation} = req.body;

    try {

        const performOperation = inventoryService.performOperation(stock_quantity, Number(quantity), operation);

        await invtryDshbrdModel.updateStkQuantity(variant_id, performOperation);

        return res.status(200).json({
            success: true,
            message: 'Stock updated successfully!'
        })
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }
}