const inventoryService = {
    getStockStatus: (stockQuantity) => {
        if (stockQuantity === 0) return 'Out of stock';
        if (stockQuantity <= 5) return 'Low stock';
        return 'In stock'
    },

    performOperation: (stock_quantity, quantity, operation) => {
        if (operation === 'add') return stock_quantity + quantity;
        if (operation === 'remove') return Math.max(0, stock_quantity - quantity);
        return quantity;
    },

    lowStockAlert: (stockQuantity, minimumStock) => {
        if (stockQuantity === 0) {
            return "Out of Stock";
        }

        if (stockQuantity < minimumStock) {
            return "Low Stock";
        }

        return "Minimum Level";
    }
}

module.exports = inventoryService;