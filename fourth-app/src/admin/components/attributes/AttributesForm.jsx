import { useEffect, useState } from "react";
import './attributesForm.css'

import { createAttribute, updateAttribute } from "../../api/attributesApi";

export default function AttributesForm({onSuccess, editAttribute, setEditAttribute}) {
    
    const [form, setForm] = useState({
        name: ''
    })

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editAttribute) {
            setForm({
                name: editAttribute.name
            })
        } else {
            setForm({
                name: ''
            })
        }
    }, [editAttribute])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name) {
            setMessage('Fill the required field');
            return;
        }

        try {
            if (editAttribute) {
                await updateAttribute(editAttribute.id, form);
                setMessage('');
                setEditAttribute(null)
            } else {
                await createAttribute(form);
                setMessage('');
            }
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Something went wrong");
        };

        setForm({
            name: ''
        })

        if (onSuccess) {
            onSuccess();
        }
    }

    return (
        <div className="attributes-dash-form-comp">
            <h4>{editAttribute ? 'Edit Attribute' : 'Add Attributes'}</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} placeholder="Enter attribute" onChange={handleChange} /><br /><br />
                <button>{editAttribute ? 'Update' : 'Add'}</button>
                {
                    editAttribute && <button type="button" onClick={() => setEditAttribute(null)}>Cancel</button>
                }
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}