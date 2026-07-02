import { useEffect, useState } from "react";
import Select from "react-select";

import './categoryForm.css'

import { createCategory, getAllCategories } from "../../api/categoryApi";

export default function CategoryForm({onSuccess, categories}) {

    const [fileKey, setFileKey] = useState(Date.now());

    const [form, setForm] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: ''
    })

    const [message, setMessage] = useState('');

    const categoryOptions = [
        {value: '', label: 'No parent'},
        ...categories.map((category) => ({
            value: category.id,
            label: category.name
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
        formData.append('parent_id', form.parent_id);
        formData.append('image', form.image);
        formData.append('description', form.description);

        try {
            data = await createCategory(formData);

            if (data.success) {
                setMessage('created successfully')
            } else {
                setMessage(data.message)
            }
        } catch (err) {
            console.error(err)
        }

        setForm({
            name: '',
            slug: '',
            parent_id: '',
            image: '',
            description: '',
        })

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
                <Select
                    options={categoryOptions}
                    placeholder="Select Parent Category"
                    isSearchable
                    defaultValue={categoryOptions[0]}
                    onChange={(selectedOption) =>
                        setForm({
                            ...form,
                            parent_id: selectedOption.value
                        })
                    }
                /><br />
                <input name="image" type="file" onChange={handleFileChange} required /><br /><br />
                <input name="description" type="text" placeholder="Enter description" onChange={handleChange} required /><br /><br />
                <button>Add</button>
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}