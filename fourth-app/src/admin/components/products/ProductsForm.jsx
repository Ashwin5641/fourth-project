import { useEffect, useState } from "react";
import './productsForm.css';

import Select from "react-select";

import { getAllCategories, getAllBrands, createProducts, updateProduct } from "../../api/productsApi";

export default function ProductsForm({onSuccess, editProduct, setEditProduct}) {

    const [form, setForm] = useState({
        name: '',
        slug: '',
        category_id: '',
        brand_id: '',
        short_description: '',
        description: '',
        featured: 'no',
        status: 'active',
        sort_order: ''
    })

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchAllCategories();
        fetchAllBrands();
    }, [])

    useEffect(() => {
        if (editProduct) {
            setForm({
                name: editProduct.name,
                slug: editProduct.slug,
                category_id: editProduct.category_id,
                brand_id: editProduct.brand_id,
                short_description: editProduct.short_description,
                description: editProduct.description,
                featured: editProduct.featured,
                status: editProduct.status,
                sort_order: editProduct.sort_order
            })
        } else {
            setForm({
                name: '',
                slug: '',
                category_id: '',
                brand_id: '',
                short_description: '',
                description: '',
                featured: 'no',
                status: 'active',
                sort_order: ''
            })
        }
    }, [editProduct])

    const fetchAllCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const fetchAllBrands = async () => {
        try {
            const res = await getAllBrands();
            setBrands(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const categoryOptions = [
        ...categories.map((category) => ({
            value: category.id,
            label: category.grandParent_name
                ? `${category.name} - ${category.parent_name} - ${category.grandParent_name}`
                : category.parent_name
                ? `${category.name} - ${category.parent_name}`
                : category.name
        }))
    ]

    const brandsOptions = [
        ...brands.map((brand) => ({
            value: brand.id,
            label: brand.name
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
            if (editProduct) {
                await updateProduct(editProduct.id, form);
                setEditProduct(null)
            } else {
                await createProducts(form);
            }
        } catch (err) {
            console.error(err)
        }

        setForm({
            name: '',
            slug: '',
            category_id: '',
            brand_id: '',
            short_description: '',
            description: '',
            featured: 'no',
            status: 'active',
            sort_order: ''
        })

        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <div className="products-dash-form-comp">
            <h4>{editProduct ? 'Edit Product' : 'Add Product'}</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" /><br /><br />
                <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="Enter product slug" /><br /><br />
                <Select 
                    options={categoryOptions}
                    isSearchable
                    placeholder="Select Category"
                    maxMenuHeight={200}
                    value={categoryOptions.find(option => option.value === form.category_id)}
                    onChange={(selectedOption) => 
                        setForm({
                            ...form,
                            category_id: selectedOption.value
                        })
                    }
                /><br />
                <Select 
                    options={brandsOptions}
                    isSearchable
                    placeholder='Select Brand'
                    maxMenuHeight={200}
                    value={brandsOptions.find(option => option.value === form.brand_id)}
                    onChange={(selectedOption) => {
                        setForm({
                            ...form,
                            brand_id: selectedOption.value
                        })
                    }}
                /><br />
                <input type="text" value={form.short_description} name="short_description" onChange={handleChange} placeholder="Enter short description" /><br /><br />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter description"></textarea><br /><br />
                <label>Featured</label>
                <div className="prod-adm-radio-group">
                    <label>
                        <input
                            type="radio"
                            name="featured"
                            value="yes"
                            checked={form.featured === 'yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="featured"
                            value="no"
                            checked={form.featured === 'no'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div><br />
                <label>Status</label>
                <div className="prod-adm-radio-group">
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={form.status === 'active'}
                            onChange={handleChange}
                        />
                        Active
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="inactive"
                            checked={form.status === 'inactive'}
                            onChange={handleChange}
                        />
                        Inactive
                    </label>
                </div><br />
                <input type="number" value={form.sort_order} name="sort_order" onChange={handleChange} placeholder="Sort order" min={0} /><br /><br />
                <button>{editProduct ? 'Update' : 'Add'}</button>
                {
                    editProduct && <button onClick={() => setEditProduct(null)} type="button">Cancel</button>
                }
            </form>
        </div>
    )
}