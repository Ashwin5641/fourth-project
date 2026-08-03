import { useEffect, useState } from "react";
import './AdmLowStckAlert.css'
import { getLowStkProduct } from "../../api/lowStkAlertsApi";

export default function AdmLowStockAlerts() {

    const [stockAlerts, setStockAlerts] = useState([]);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest');
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAllLowStockProducts(search);
        }, 400);

        return () => clearTimeout(timer)

    }, [search, page, sort, limit])

    const fetchAllLowStockProducts = async () => {
        try {
            const res = await getLowStkProduct(search, page, sort, limit);
            setStockAlerts(res.data);
            setTotalPages(res.pagination.totalPages);
            setTotalRecords(res.pagination.totalRecords);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="admLowStkAlert-dash">
            <div className="admLowStkAlert-dash-header">
                <h4>Low Stock Alerts</h4>
            </div>
            <div className="admLowStkAlert-search">
                <input
                    type="text"
                    placeholder="Search product or sku..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="admLowStkAlert-controls">
                <div>
                    <label>Show: </label>
                    <select
                        value={limit}
                        onChange={(e) => {setLimit(Number(e.target.value)); setPage(1);}}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div>
                    <label>Sort By: </label>
                    <select
                        value={sort}
                        onChange={(e) => {setSort(e.target.value); setPage(1)}}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="product_asc">Product A-Z</option>
                        <option value="product_desc">Product Z-A</option>
                    </select>
                </div>
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
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{stockAlert.product_name}</td>
                                <td>{stockAlert.sku}</td>
                                <td>{stockAlert.stock_quantity}</td>
                                <td>{stockAlert.minimum_stock}</td>
                                <td>
                                    <span className={`status ${stockAlert.status.toLowerCase().replace(/\s/g, '-')}`}>
                                        {stockAlert.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="admLowStkAlert-pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span>
                    <p>
                        Showing Page {page} of {totalPages} ({totalRecords} records)
                    </p>
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}