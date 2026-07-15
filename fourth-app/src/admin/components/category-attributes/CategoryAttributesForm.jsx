import { useEffect, useState } from "react";
import './CategoryAttributesForm.css';

import Select from "react-select";

import { getAllCategories, getAllAttributes, createCategoryAttribute } from "../../api/categoryAttributesApi";

export default function CategoryAttributesForm({onSuccess}) {

    const [form, setForm] = useState({
        category_id: null,
        attribute_id: null
    })

    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    
    useEffect(() => {
        fetchAllCategories();
        fetchAllAttributes();
    }, [])

    const fetchAllCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchAllAttributes = async () => {
        try {
            const res = await getAllAttributes();
            setAttributes(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const categoryOptions = [
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

    const attributesOptions = [
        ...attributes.map((attribute) => ({
            value: attribute.id,
            label: attribute.name
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
            await createCategoryAttribute(form);
            setForm({
                category_id: null,
                attribute_id: null
            })
        } catch (err) {
            console.error(err)
        }

        setForm({
            category_id: null,
            attribute_id: null
        })

        if (onSuccess) {
            onSuccess();
        }
    }

    return (
        <div className="categoryAttributes-dash-form-comp">
            <h4>Add Category Attribute</h4>
            <form onSubmit={handleSubmit}>
                <Select 
                    placeholder='Select category'
                    options={categoryOptions}
                    isSearchable
                    maxMenuHeight={200}
                    value={categoryOptions.find((option) => option.value === form.category_id)}
                    onChange={(selectedOption) => 
                        setForm({
                            ...form,
                            category_id: selectedOption.value
                        })
                    }
                /><br />
                <Select 
                    placeholder='Select attribute'
                    options={attributesOptions}
                    isSearchable
                    maxMenuHeight={200}
                    value={attributesOptions.find((option) => option.value === form.attribute_id)}
                    onChange={(selectedOption) => 
                        setForm({
                            ...form,
                            attribute_id: selectedOption.value
                        })
                    }
                /><br />
                <button>Add</button>
            </form>
        </div>
    )
}