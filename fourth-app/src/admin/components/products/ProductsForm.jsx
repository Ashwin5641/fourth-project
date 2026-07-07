import { useEffect, useState } from "react";
import './productsForm.css';

import Select from "react-select";

import { getAllCategories, getAllBrands, createProducts } from "../../api/productsApi";

export default function ProductsForm() {

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
            const res = await createProducts(form);
            return res;
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="products-dash-form-comp">
            <h4>Add Product</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="Enter product name" /><br /><br />
                <input type="text" name="slug" onChange={handleChange} placeholder="Enter product slug" /><br /><br />
                <Select 
                    options={categoryOptions}
                    isSearchable
                    placeholder="Select Category"
                    maxMenuHeight={200}
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
                    onChange={(selectedOption) => {
                        setForm({
                            ...form,
                            brand_id: selectedOption.value
                        })
                    }}
                /><br />
                <input type="text" name="short_description" onChange={handleChange} placeholder="Enter short description" /><br /><br />
                <textarea name="description" onChange={handleChange} placeholder="Enter description"></textarea><br /><br />
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
                <input type="number" name="sort_order" onChange={handleChange} placeholder="Sort order" /><br /><br />
                <button>Add</button>
            </form>
        </div>
    )
}