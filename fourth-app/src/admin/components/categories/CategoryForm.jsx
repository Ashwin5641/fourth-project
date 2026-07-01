import { useEffect, useState } from "react";
import './categoryForm.css'

import { createCategory, getAllCategories } from "../../api/categoryApi";

export default function CategoryForm({onSuccess}) {

    const [parentCategories, setParentCategories] = useState([]);

    const [fileKey, setFileKey] = useState(Date.now());

    const [form, setForm] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: ''
    })

    useEffect(() => {
        const fetchParentId = async () => {
            try {
                const res = await getAllCategories();
                setParentCategories(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchParentId()
    }, [])

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

        formData.append('name', form.name);
        formData.append('slug', form.slug);
        formData.append('parent_id', form.parent_id);
        formData.append('image', form.image);
        formData.append('description', form.description);

        try {
            await createCategory(formData);
        } catch (err) {
            console.error(err)
        }

        setFileKey(Date.now());

        if (onSuccess) {
            onSuccess();
        }
    }

    return (
        <div className="category-dash-form-comp">
            <h4>Add Category</h4>
            <form onSubmit={handleSubmit} key={fileKey}>
                <input name="name" type="text" placeholder="Enter category" onChange={handleChange} required /><br /><br />
                <input name="slug" type="text" placeholder="Enter slug" onChange={handleChange} required /><br /><br />
                <select name="parent_id" id="" onChange={handleChange}>
                    {parentCategories.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select><br /><br />
                <input name="image" type="file" onChange={handleFileChange} required /><br /><br />
                <input name="description" type="text" placeholder="Enter description" onChange={handleChange} required /><br /><br />
                <button>Add</button>
            </form>
        </div>
    )
}