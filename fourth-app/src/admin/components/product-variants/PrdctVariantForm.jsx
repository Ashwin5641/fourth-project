import { useEffect, useState } from "react";
import './PrdctVariantForm.css'

import Select from "react-select";

import { getAllProducts, getProductAttributes, createProductVariant, updateProductVariant } from "../../api/prdctVariantApi";

export default function PrdctVariantForm({onSuccess, editProductVariant, setEditProductVariant}) {

    const [products, setProducts] = useState([]);

    const [attributes, setAttributes] = useState([]);

    const [form, setForm] = useState({
        product_id: null,
        sku: '',
        price: '',
        stock_quantity: '',
        minimum_stock: '',
        attribute_values: {}
    })

    useEffect(() => {
        if (editProductVariant) {
            console.log(editProductVariant.attributes);

            const attributeValues = {};

            editProductVariant.attributes.forEach((attr) => {
                attributeValues[attr.attribute_id] = attr.attribute_value_id
            });

            setForm({
                product_id: editProductVariant.product_id,
                sku: editProductVariant.sku,
                price: editProductVariant.price,
                stock_quantity: editProductVariant.stock_quantity,
                minimum_stock: editProductVariant.minimum_stock,
                attribute_values: attributeValues
            })
        } else {
            setForm({
                product_id: null,
                sku: '',
                price: '',
                stock_quantity: '',
                minimum_stock: '',
                attribute_values: {}
            })
        }
    }, [editProductVariant])

    useEffect(() => {
        fetchAllProducts()
    }, [])

    useEffect(() => {
        if (!form.product_id) return;

        fetchCategoryId(form.product_id);
    }, [form.product_id])

    const fetchAllProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    const fetchCategoryId = async (product_id) => {
        try {
            const res = await getProductAttributes(product_id);
            console.log(res.data)
            setAttributes(res.data)
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editProductVariant) {
                await updateProductVariant(editProductVariant.variant_id, form);
                setEditProductVariant(null)
                setAttributes([])
            } else {
                await createProductVariant(form);
                setAttributes([])
            }
        } catch (err) {
            console.error(err)
        }

        setForm({
            product_id: null,
            sku: '',
            price: '',
            stock_quantity: '',
            minimum_stock: '',
            attribute_values: {}
        })

        if (onSuccess) {
            onSuccess();
        }
    }

    return (
        <div className="prdctVariant-dash-form-comp">
            <h4>{editProductVariant ? 'Edit Product Variant' : 'Add Product Variant'}</h4>
            <form onSubmit={handleSubmit}>
                <Select
                    placeholder='Select product'
                    options={productOptions}
                    isSearchable
                    isDisabled={editProductVariant ? true : false}
                    value={productOptions.find((option) => option.value === form.product_id)}
                    onChange={(selectedOption) =>
                        setForm({
                            ...form,
                            product_id: selectedOption.value
                        })
                    }
                /><br />
                <input type="text" value={form.sku} name="sku" placeholder="Stock keeping unit" onChange={handleChange} /><br /><br />
                <input type="number" value={form.price} name="price" placeholder="Price" onChange={handleChange} min={0} /><br /><br />
                <input type="number" value={form.stock_quantity} name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} min={0} /><br /><br />
                <input type="number" value={form.minimum_stock} name="minimum_stock" placeholder="Enter minumum stock" onChange={handleChange} min={0} /><br /><br />
                {
                    attributes.map((attribute) => {

                        const options = attribute.values.map(v => ({
                            value: v.id,
                            label: v.value
                        }));

                        return (
                            <div key={attribute.attribute_id}>
                                <label>{attribute.attribute_name}</label>
                                <Select
                                    isSearchable
                                    options={options}
                                    value={options.find((option) => option.value === form.attribute_values[attribute.attribute_id])}
                                    onChange={(selectOption) =>
                                        setForm(prev => ({
                                            ...prev,
                                            attribute_values: {
                                                ...prev.attribute_values,
                                                [attribute.attribute_id]: selectOption.value
                                            }
                                        }))
                                    }
                                    maxMenuHeight={200}
                                />
                            </div>
                        )
                    })
                }
                <button type="submit">{editProductVariant ? 'Update' : 'Add'}</button>
                {editProductVariant && <button type="button" onClick={() => setEditProductVariant(null)}>Cancel</button>}
            </form>
        </div>
    )
}