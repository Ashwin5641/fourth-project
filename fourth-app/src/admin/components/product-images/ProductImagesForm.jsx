import { useEffect, useState } from "react";
import './productimagesform.css'

import Select from "react-select";

import { getAllProducts, createProductImages } from "../../api/productImagesApi";

export default function ProductImagesForm() {

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        product_id: '',
        image: null,
        is_primary: '',
        sort_order: ''
    })

    useEffect(() => {
        fetchAllProducts();
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

    const handleFileChange = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('product_id', form.product_id);
        formData.append('image', form.image);
        formData.append('is_primary', form.is_primary);
        formData.append('sort_order', form.sort_order);

        try {
            await createProductImages(formData)
        } catch (err) {
            console.error(err)
        }

        setForm({
            product_id: '',
            image: null,
            is_primary: '',
            sort_order: ''
        })
    }

    return (
        <div className="productImages-dash-form-comp">
            <h4>Add Product Images</h4>
            <form onSubmit={handleSubmit}>
                <Select
                    options={productOptions}
                    placeholder='Select product'
                    isSearchable
                    maxMenuHeight={200}
                    onChange={(selectedOption) => {
                        setForm({
                            ...form,
                            product_id: selectedOption.value
                        })
                    }}
                    value={productOptions.find(option => option.value === form.product_id)}
                /><br />
                <input type="file" accept="image/*" onChange={handleFileChange} /><br /><br />
                <label>Primary</label>
                <div className="prodimg-adm-radio-grp">
                    <label>
                        <input type="radio" value={'true'} name="is_primary" onChange={handleChange} />
                        Yes
                    </label>
                    <label>
                        <input type="radio" value={'false'} name="is_primary" onChange={handleChange} />
                        No
                    </label>
                </div><br />
                <input type="number" name="sort_order" min={0} placeholder="Sort order" onChange={handleChange} /><br /><br />
                <button>Add</button>
            </form>
        </div>
    )
}