const inventoryService = {
    getStockStatus: (stockQuantity) => {
        if (stockQuantity === 0) return 'Out of stock';
        if (stockQuantity <= 5) return 'Low stock';
        return 'In stock'
    }
}

module.exports = inventoryService;