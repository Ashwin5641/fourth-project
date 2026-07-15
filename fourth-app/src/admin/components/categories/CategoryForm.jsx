import { useEffect, useState } from "react";
import Select from "react-select";

import './categoryForm.css'

import { createCategory, updateCategory } from "../../api/categoryApi";

export default function CategoryForm({onSuccess, categories, editCategory, setEditCategory}) {

    const [fileKey, setFileKey] = useState(Date.now());

    const [form, setForm] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: ''
    })

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editCategory) {
            setForm({
                name: editCategory.name,
                slug: editCategory.slug,
                parent_id: editCategory.parent_id,
                image: null,
                description: editCategory.description
            })
        } else {
            setForm({
                name: '',
                slug: '',
                parent_id: '',
                image: null,
                description: '',
            })
        }

        setFileKey(Date.now());
    }, [editCategory])

    const categoryOptions = [
        {value: null, label: 'No parent'},
        ...categories.map((category) => ({
            value: category.id,
            label: category.greatGrandParent_name
                ? `${category.name} - ${category.parent_name} - ${category.grandparent_name} - ${category.greatGrandParent_name}`
                : category.grandparent_name
                ? `${category.name} - ${category.parent_name} - ${category.grandparent_name}`
                : category.parent_name
                ? `${category.name} - ${category.parent_name}`
                : category.name
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

        formData.append('name', form.name);
        formData.append('slug', form.slug);
        formData.append('parent_id', form.parent_id || '');
        formData.append('image', form.image);
        formData.append('description', form.description);

        try {
            if (editCategory) {
                await updateCategory(editCategory.id, formData);
                setEditCategory(null)
            } else {
                await createCategory(formData);
            }
        } catch (err) {
            console.error(err)
        }

        setForm({
            name: '',
            slug: '',
            parent_id: '',
            image: null,
            description: '',
        })

        setFileKey(Date.now());

        if (onSuccess) {
            onSuccess();
        }
    }

    return (
        <div className="category-dash-form-comp">
            <h4>{editCategory ? 'Edit Category' : 'Add Category'}</h4>
            <form onSubmit={handleSubmit} key={fileKey}>
                <input name="name" type="text" placeholder="Enter category" value={form.name} onChange={handleChange} required /><br /><br />
                <input name="slug" type="text" placeholder="Enter slug" value={form.slug} onChange={handleChange} required /><br /><br />
                <Select
                    options={categoryOptions}
                    placeholder="Select Parent Category"
                    isSearchable
                    maxMenuHeight={200}
                    value={categoryOptions.find(option => option.value === form.parent_id)}
                    onChange={(selectedOption) =>
                        setForm({
                            ...form,
                            parent_id: selectedOption.value
                        })
                    }
                /><br />
                <input name="image" type="file" onChange={handleFileChange} /><br /><br />
                <input name="description" type="text" value={form.description} placeholder="Enter description" onChange={handleChange} required /><br /><br />
                <button>{editCategory ? "Update" : "Add"}</button>
                {
                    editCategory && <button onClick={() => setEditCategory(null)}>Cancel</button>
                }
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}