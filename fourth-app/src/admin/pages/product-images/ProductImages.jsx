import { useState } from "react";
import './productImages.css'

import ProductImagesForm from "../../components/product-images/ProductImagesForm";

export default function ProductImages() {
    return (
        <>
            <div className="productImages-dash">
                <div className="productImages-dash-header">
                    <h4>Product Images Management</h4>
                </div>
                <div className="productImages-dash-form">
                    <ProductImagesForm />
                </div>
            </div>
        </>
    )
}