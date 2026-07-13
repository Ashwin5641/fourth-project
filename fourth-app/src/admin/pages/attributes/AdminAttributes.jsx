import { useEffect, useState } from "react";
import './adminAttributes.css'

import AttributesForm from "../../components/attributes/AttributesForm";
import { deleteAttribute, getAllAttributes } from "../../api/attributesApi";

export default function AdminAttributes() {

    const [attributes, setAttributes] = useState([]);

    const [editAttribute, setEditAttribute] = useState(null);

    useEffect(() => {
        fetchAllAttributes();
    }, []);

    const fetchAllAttributes = async () => {
        try {
            const res = await getAllAttributes();
            setAttributes(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteAttribute(id);
            fetchAllAttributes();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (edit) => {
        setEditAttribute(edit)
    }

    return (
        <>
            <div className="attributes-dash">
                <div className="attributes-dash-header">
                    <h4>Attributes Management</h4>
                </div>
                <div className="attributes-dash-form">
                    <AttributesForm onSuccess={fetchAllAttributes} editAttribute={editAttribute} setEditAttribute={setEditAttribute} />
                </div>
                <div className="attributes-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attributes.map((attribute, index) => (
                                <tr key={attribute.id}>
                                    <td>{index + 1}</td>
                                    <td>{attribute.name}</td>
                                    <td>{new Date(attribute.created_at).toLocaleString()}</td>
                                    <td>{new Date(attribute.updated_at).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(attribute)}>Edit</button>
                                        <button onClick={() => handleDelete(attribute.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}