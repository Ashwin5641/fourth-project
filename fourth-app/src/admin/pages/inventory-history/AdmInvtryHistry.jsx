import { useEffect, useState } from "react";
import './AdmInvtryHistry.css'
import { getAllInvntryHistry } from "../../api/inventoryHistoryApi";

export default function AdminInventoryHistory() {

    const [inventoryHistory, setInventoryHistory] = useState([]);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState("newest");
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAllInvntryHistry(search);
        }, 400);

        return () => clearTimeout(timer)
    }, [search, page, limit, sort])

    const fetchAllInvntryHistry = async () => {
        try {
            const res = await getAllInvntryHistry(search, page, limit, sort);
            setTotalPages(res.pagination.totalPages);
            setTotalRecords(res.pagination.totalRecords);
            setInventoryHistory(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="admInvrtryHistry-dash">
            <div className="admInvrtryHistry-dash-header">
                <h4>Inventory History</h4>
            </div>
            <div className="admInvrtryHistry-search">
                <input
                    type="text"
                    placeholder="Search product or sku or reason...."
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setPage(1);}}
                />
            </div>
            <div className="admInvrtryHistry-controls">
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
            <div className="admInvrtryHistry-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Operation</th>
                            <th>Previous</th>
                            <th>Changed</th>
                            <th>New</th>
                            <th>Reason</th>
                            <th>By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryHistory.map((history, index) => (
                            <tr key={history.id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{new Date(history.created_at).toLocaleString("en-IN")}</td>
                                <td>{history.product}</td>
                                <td>{history.sku}</td>
                                <td>{history.operation}</td>
                                <td>{history.previous_quantity}</td>
                                <td>{history.quantity_changed}</td>
                                <td>{history.new_quantity}</td>
                                <td>{history.reason}</td>
                                <td>{history.user_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="admInventory-pagination">
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