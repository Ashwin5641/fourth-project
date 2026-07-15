import { useState } from "react";
import './AdmPrdctVariants.css'

import PrdctVariantForm from "../../components/product-variants/PrdctVariantForm";

export default function AdminProductVariants() {
    return (
        <div className="admPrdctVariant-dash">
            <div className="admPrdctVariant-dash-header">
                <h4>Product Variants Management</h4>
            </div>
            <div className="admPrdctVariant-dash-form">
                <PrdctVariantForm />
            </div>
        </div>
    )
}