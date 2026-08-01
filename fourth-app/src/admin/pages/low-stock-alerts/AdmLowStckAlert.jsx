import { useEffect, useState } from "react";
import './AdmLowStckAlert.css'
import { getLowStkProduct } from "../../api/lowStkAlertsApi";

export default function AdmLowStockAlerts() {

    const [stockAlerts, setStockAlerts] = useState([]);

    useEffect(() => {
        fetchAllLowStockProducts();
    }, [])

    const fetchAllLowStockProducts = async () => {
        try {
            const res = await getLowStkProduct();
            setStockAlerts(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="admLowStkAlert-dash">
            <div className="admLowStkAlert-dash-header">
                <h4>Low Stock Alerts</h4>
            </div>
            <div className="admLowStkAlert-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Stock</th>
                            <th>Minimum Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockAlerts.map((stockAlert, index) => (
                            <tr key={stockAlert.id}>
                                <td>{index + 1}</td>
                                <td>{stockAlert.product_name}</td>
                                <td>{stockAlert.sku}</td>
                                <td>{stockAlert.stock_quantity}</td>
                                <td>{stockAlert.minimum_stock}</td>
                                <td>{stockAlert.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}