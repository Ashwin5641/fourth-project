import { useEffect, useState } from "react";
import './adminProducts.css'

import ProductsForm from "../../components/products/ProductsForm";

import { getAllProducts } from "../../api/productsApi";

export default function AdminProducts() {

    const [products, setProducts] = useState([]);

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

    return (
        <>
            <div className="category-dash">
                <div className="products-dash-header">
                    <h4>Products Management</h4>
                </div>
                <div className="products-dash-form">
                    <ProductsForm />
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
                                <tr>
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
                                        <button>Edit</button>
                                        <button>Delete</button>
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