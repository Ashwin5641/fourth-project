import { useEffect, useState } from "react";
import './adminProducts.css'

import ProductsForm from "../../components/products/ProductsForm";

import { getAllProducts, deleteProduct } from "../../api/productsApi";

export default function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchAllProducts();
    }, [])

    const fetchAllProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id)
            fetchAllProducts();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (edit) => {
        setEditProduct(edit);
    }

    return (
        <>
            <div className="products-dash">
                <div className="products-dash-header">
                    <h4>Products Management</h4>
                </div>
                <div className="products-dash-form">
                    <ProductsForm onSuccess={fetchAllProducts} editProduct={editProduct} setEditProduct={setEditProduct} />
                </div>
                <div className="products-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Short Description</th>
                                <th>Description</th>
                                <th>Featured</th>
                                <th>Status</th>
                                <th>Sort Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.slug}</td>
                                    <td>{product.category_name}</td>
                                    <td>{product.brand_name}</td>
                                    <td>{product.short_description}</td>
                                    <td>{product.description}</td>
                                    <td>{product.featured}</td>
                                    <td>{product.status}</td>
                                    <td>{product.sort_order}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product)}>Edit</button>
                                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}