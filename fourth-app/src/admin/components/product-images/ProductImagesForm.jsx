import { useEffect, useState } from "react";
import './productimagesform.css'

import Select from "react-select";

import { getAllProducts, createProductImages, updateProductImage } from "../../api/productImagesApi";

export default function ProductImagesForm({onSuccess, editProductImage, setEditProductImage}) {

    const [fileKey, setFileKey] = useState(Date.now());

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        product_id: '',
        image: null,
        is_primary: '0',
        sort_order: ''
    })

    useEffect(() => {
        fetchAllProducts();
    }, [])

    useEffect(() => {
        if (editProductImage) {
            setForm({
                product_id: editProductImage.product_id,
                image: null,
                is_primary: editProductImage.is_primary,
                sort_order: editProductImage.sort_order
            })
        } else {
            setForm({
                product_id: '',
                image: null,
                is_primary: '0',
                sort_order: ''
            })
        }
    }, [editProductImage]) 

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
            if (editProductImage) {
                await updateProductImage(editProductImage.id, formData);
                setEditProductImage(null)
            } else {
                await createProductImages(formData)
            }
        } catch (err) {
            console.error(err)
        }

        setForm({
            product_id: '',
            image: null,
            is_primary: '0',
            sort_order: ''
        })

        setFileKey(Date.now());

        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <div className="productImages-dash-form-comp">
            <h4>{editProductImage ? 'Edit Product Images' : 'Add Product Images'}</h4>
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
                <input key={fileKey} type="file" accept="image/*" onChange={handleFileChange} /><br /><br />
                <label>Primary</label>
                <div className="prodimg-adm-radio-grp">
                    <label>
                        <input type="radio" value='1' checked={String(form.is_primary) === '1'} name="is_primary" onChange={handleChange} />
                        Yes
                    </label>
                    <label>
                        <input type="radio" value='0' checked={String(form.is_primary) === '0'} name="is_primary" onChange={handleChange} />
                        No
                    </label>
                </div><br />
                <input type="number" name="sort_order" min={0} placeholder="Sort order" onChange={handleChange} value={form.sort_order} /><br /><br />
                <button>{editProductImage ? 'Update' : 'Add'}</button>
                {
                    editProductImage && <button type="button" onClick={() => setEditProductImage(null)}>Cancel</button>
                }
            </form>
        </div>
    )
}