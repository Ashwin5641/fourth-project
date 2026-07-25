import { useEffect, useState } from "react";
import './AdmStkDashboard.css';

import { getStockDashboard } from "../../api/AdmStkDshbrdApi";

export default function AdmStkDashboard() {

    const [stockValues, setStockValues] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAllStocks(search)
        }, 400)

        return () => clearTimeout(timer);
    }, [search]);

    const fetchAllStocks = async (searchText = '') => {
        try {
            const res = await getStockDashboard(searchText);
            setStockValues(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="admStkDshbrd-dash">
            <div className="admStkDshbrd-dash-header">
                <h4>Stock Dashboard</h4>
            </div>
            <div className="admStkDshbrd-search">
                <input
                    type="text"
                    placeholder="Search SKU or Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="admStkDshbrd-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>SKU</th>
                            <th>Product</th>
                            <th>Variant</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockValues.map((stockValue, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{stockValue.sku}</td>
                                <td>{stockValue.product_name}</td>
                                <td>{stockValue.attributes.map((attr, index) => (
                                        <span key={attr.attribute_id}>
                                                <strong>{attr.attribute_name}</strong>: {attr.attribute_value}<br />
                                        </span>
                                    ))}
                                </td>
                                <td>{stockValue.stock_quantity}</td>
                                <td>{stockValue.stock_status}</td>
                                <td>
                                    <button>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}