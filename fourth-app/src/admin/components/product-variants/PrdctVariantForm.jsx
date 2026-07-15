import { useEffect, useState } from "react";
import './PrdctVariantForm.css'

import Select from "react-select";
import { getAllProducts } from "../../api/productsApi";

export default function PrdctVariantForm() {

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        product_id: null,
        sku: '',
        price: '',
        stock_quantity: '',
        variant_id: '',
        attribute_value_id: ''
    })

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const fetchAllProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const productOptions = [
        ...products.map((product) => ({
            value: product.id,
            label: product.name
        }))
    ]

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="prdctVariant-dash-form-comp">
            <h4>Add Product Variant</h4>
            <form>
                <Select
                    placeholder='Select product'
                    options={productOptions}
                    isSearchable
                    value={productOptions.find((option) => option.value === form.product_id)}
                    onChange={(selectedOption) => 
                        setForm({
                            ...form,
                            product_id: selectedOption.value
                        })
                    }
                /><br />
                <input type="text" name="sku" placeholder="Stock keeping unit" onChange={handleChange} /><br /><br />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} min={0} /><br /><br />
                <input type="number" name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} min={0} /><br /><br />
            </form>
        </div>
    )
}