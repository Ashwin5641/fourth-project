import { useEffect, useState } from "react";
import './productImages.css'

import ProductImagesForm from "../../components/product-images/ProductImagesForm";

import { getAllProductImages, deleteProductImage } from "../../api/productImagesApi";

export default function ProductImages() {

    const [productImages, setProductImages] = useState([]);

    const [editProductImage, setEditProductImage] = useState(null);

    useEffect(() => {
        fetchProductImages();
    }, [])

    const fetchProductImages = async () => {
        try {
            const res = await getAllProductImages();
            setProductImages(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteProductImage(id);
            fetchProductImages();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = async (edit) => {
        setEditProductImage(edit)
    }

    return (
        <>
            <div className="productImages-dash">
                <div className="productImages-dash-header">
                    <h4>Product Images Management</h4>
                </div>
                <div className="productImages-dash-form">
                    <ProductImagesForm onSuccess={fetchProductImages} editProductImage={editProductImage} setEditProductImage={setEditProductImage}/>
                </div>
                <div className="productImages-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Is Primary</th>
                                <th>Sort Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productImages.map((productImage) => (
                                <tr key={productImage.id}>
                                    <td>{productImage.product_name}</td>
                                    <td>{productImage.image}</td>
                                    <td>{productImage.is_primary}</td>
                                    <td>{productImage.sort_order}</td>
                                    <td>
                                        <button onClick={() => handleEdit(productImage)}>Edit</button>
                                        <button onClick={() => handleDelete(productImage.id)}>Delete</button>
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