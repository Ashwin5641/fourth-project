import { useEffect, useState } from "react";
import './attributeValuesForm.css'

import Select from "react-select";

import { createAttributeValue, getAllAttributes, updateAttributeValue } from "../../api/attributeValuesApi";

export default function AttributeValuesForm({onSuccess, editAttributeValue, setEditAttributeValue}) {

    const [form, setForm] = useState({
        attribute_id: null,
        value: ''
    })

    const [attributes, setAttributes] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllcategories();
    }, [])

    useEffect(() => {
        if (editAttributeValue) {
            setForm({
                attribute_id: editAttributeValue.attribute_id,
                value: editAttributeValue.value
            })
        } else {
            setForm({
                attribute_id: null,
                value: ''
            })
        }
    }, [editAttributeValue])

    const fetchAllcategories = async () => {
        try {
            const res = await getAllAttributes();
            setAttributes(res.data)
        } catch (err) {
            console.error(err)
        }
    }

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

        if (!form.attribute_id || !form.value) {
            setMessage('Fill the required fields');
            return;
        }

        try {
            if (editAttributeValue) {
                await updateAttributeValue(editAttributeValue.id, form);
            } else {
                await createAttributeValue(form);
            }
        } catch (err) {
            console.error(err.response?.data?.message || 'Something went wrong!')
            setMessage(err.response?.data?.message || 'Something went wrong!')
        }

        setForm({
            attribute_id: null,
            value: ''
        })

        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <div className="attributeValuesForm-dash-form-comp">
            <h4>{editAttributeValue ? 'Edit Attribute Value' : 'Add Attribute Value'}</h4>
            <form onSubmit={handleSubmit}>
                <Select
                    placeholder='Select Attribute'
                    options={attributesOptions}
                    isSearchable
                    maxMenuHeight={200}
                    value={attributesOptions.find((option) => option.value === form.attribute_id)}
                    onChange={(selectedOption) => {
                        setForm({
                            ...form,
                            attribute_id: selectedOption.value
                        })
                    }}
                /><br />
                <input type="text" name="value" value={form.value} placeholder="Enter the value" onChange={handleChange} /><br /><br />
                <button>{editAttributeValue ? 'Edit' : 'Add'}</button>
                {
                    editAttributeValue && <button type="button" onClick={() => setEditAttributeValue(null)}>Cancel</button>
                }
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}