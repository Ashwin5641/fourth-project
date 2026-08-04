import { useEffect, useState } from "react";
import './AdmStkDashboard.css';

import { getStockDashboard, updateStkOfPrdctVrnt } from "../../api/admStkDshbrdApi";

export default function AdmStkDashboard() {

    const [stockValues, setStockValues] = useState([]);
    const [search, setSearch] = useState('');

    const [editStock, setEditStock] = useState(null);

    const [form, setForm] = useState({
        quantity: '',
        operation: '',
        reason: ''
    })

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

    const handleEdit = (edit) => {
        setEditStock(edit);
        setForm({
            quantity: '',
            operation: '',
            reason: ''
        });
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editStock) {

            const payload = {
                stock_quantity: editStock.stock_quantity,
                quantity: form.quantity,
                operation: form.operation,
                reason: form.reason
            }

            if(!form.quantity || Number(form.quantity) <= 0){
                alert("Enter valid quantity");
                return;
            }

            if (!form.operation) {
                alert("Select operation");
                return;
            }

            if (!form.reason) {
                alert("Select reason");
                return;
            }

            try {
                await updateStkOfPrdctVrnt(editStock.variant_id, payload);
                setEditStock(null);
                fetchAllStocks(search)
                setForm({
                    quantity: '',
                    operation: '',
                    reason: ''
                });
            } catch (err) {
                console.error(err)
            }
        } else {
            return 'None'
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
                                    <button onClick={() => handleEdit(stockValue)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                editStock && 
                <div onClick={() => setEditStock(null)} className='editStock-overlay'>
                    <div onClick={(e) => e.stopPropagation()} className="editStock-model">
                        <form onSubmit={handleSubmit}>
                            <p><span>Product Name:</span><span>{editStock.product_name}</span></p>
                            <br />
                            <p><span>Product SKU:</span><span>{editStock.sku}</span></p>
                            <br />
                            <p><span>Current Stock:</span><span>{editStock.stock_quantity}</span></p>
                            <br />
                            <div className="editStock-form-grp">
                                <label>Quantity: </label>
                                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min={0} placeholder="Enter quantity" />
                            </div>
                            <br />
                            <div className="editStock-form-reason">
                                <p>Operation: </p>
                                <div className="editStock-form-reason-radio">
                                    <input name="operation" onChange={handleChange} value='add' type="radio" /><span>Add Stock</span>
                                </div>
                                <div className="editStock-form-reason-radio">
                                    <input name="operation" onChange={handleChange} value='remove' type="radio" /><span>Remove Stock</span>
                                </div>
                                <div className="editStock-form-reason-radio">
                                    <input name="operation" onChange={handleChange} value='set' type="radio" /><span>Set Exact Stock</span>
                                </div>
                            </div>
                            <br />
                            <div className="editStock-form-grp">
                                <label>Reason: </label>
                                <select 
                                    name="reason"
                                    value={form.reason}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Reason</option>
                                    <option value="Purchase">Purchase</option>
                                    <option value="Stock Adjustment">Stock Adjustment</option>
                                    <option value="Customer Return">Customer Return</option>
                                    <option value="Damaged">Damaged</option>
                                    <option value="Supplier Return">Supplier Return</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <br />
                            <div className="editStock-form-buttons">
                                <button>Update</button>
                                <button type="button" onClick={() => setEditStock(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}