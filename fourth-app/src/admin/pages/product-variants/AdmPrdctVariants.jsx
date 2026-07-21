import { useEffect, useState } from "react";
import './AdmPrdctVariants.css'

import PrdctVariantForm from "../../components/product-variants/PrdctVariantForm";

import { getAllProductVariants, deleteProductVariant } from "../../api/prdctVariantApi";

export default function AdminProductVariants() {

    const [productVariants, setProductVariants] = useState([]);

    const [editProductVariant, setEditProductVariant] = useState(null);

    useEffect(() => {
        fetchAllProductVariants();
    }, [])

    const fetchAllProductVariants = async () => {
        try {
            const res = await getAllProductVariants();
            setProductVariants(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteProductVariant(id);
            fetchAllProductVariants();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (edit) => {
        setEditProductVariant(edit)
        console.log(edit)
    }
 
    return (
        <div className="admPrdctVariant-dash">
            <div className="admPrdctVariant-dash-header">
                <h4>Product Variants Management</h4>
            </div>
            <div className="admPrdctVariant-dash-form">
                <PrdctVariantForm 
                    onSuccess={fetchAllProductVariants} 
                    editProductVariant={editProductVariant} 
                    setEditProductVariant={setEditProductVariant}
                />
            </div>
            <div className="admPrdctVariant-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Product</th>
                            <th>Sku</th>
                            <th>Attributes</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productVariants.map((productVariant, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{productVariant.product_name}</td>
                                <td>{productVariant.sku}</td>
                                <td>
                                    {productVariant.attributes.map((attr, index) => (
                                        <span key={attr.attribute_name}>
                                            <strong>{attr.attribute_name}</strong>: {attr.attribute_value}<br />
                                        </span>
                                    ))}
                                </td>
                                <td>{productVariant.price}</td>
                                <td>{productVariant.stock_quantity}</td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleEdit(productVariant)}>Edit</button>
                                    <button onClick={() => handleDelete(productVariant.variant_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}