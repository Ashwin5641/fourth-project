import { useEffect, useState } from "react";
import './brandsForm.css';

import { createBrand, updateBrand } from "../../api/brandsApi";

export default function BrandsForm({onSuccess, editBrand, setEditBrand}) {

    const [form, setForm] = useState({
        name: '',
        slug: '',
        logo: null,
        description: ''
    })

    const [fileKey, setFileKey] = useState(Date.now());

    useEffect(() => {
        if (editBrand) {
            setForm({
                name: editBrand.name,
                slug: editBrand.slug,
                logo: null,
                description: editBrand.description,
            })
        } else {
            setForm({
                name: '',
                slug: '',
                logo: null,
                description: ''
            })
        }
    }, [editBrand])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleFileChange = (e) => {
        setForm({
            ...form,
            logo: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', form.name);
        formData.append('slug', form.slug);
        formData.append('logo', form.logo);
        formData.append('description', form.description);

        try {
            if (editBrand) {
                const res = await updateBrand(editBrand.id, formData)
                setEditBrand(null)
            } else {
                const res = await createBrand(formData)
            }
        } catch (err) {
            console.error(err);
        }

        setForm({
            name: '',
            slug: '',
            logo: null,
            description: ''
        })

        if (onSuccess) {
            onSuccess();
        }

        setFileKey(Date.now());
    }

    return (
       <div className="brands-dash-form-comp">
            <h4>{editBrand ? 'EDIT BRAND' : 'ADD BRAND'}</h4>
            <form onSubmit={handleSubmit} key={fileKey}>
                <input type="text" name="name" value={form.name} placeholder="Enter brand name" onChange={handleChange} /><br /><br />
                <input type="text" name="slug" value={form.slug} placeholder="Enter brand slug" onChange={handleChange} /><br /><br />
                <input type="file" name="logo" onChange={handleFileChange} /><br /><br />
                <input type="text" name="description" value={form.description} placeholder="Enter brand description" onChange={handleChange} /><br /><br />
                <button>{editBrand ? 'UPDATE' : 'ADD'}</button>
                {
                    editBrand && <button type="button" onClick={() => setEditBrand(null)}>Cancel</button>
                }
            </form>
       </div>
    )
}