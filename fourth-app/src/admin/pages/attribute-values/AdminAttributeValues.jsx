import { useEffect, useState } from "react";
import './AdminAttributeValues.css';

import AttributeValuesForm from "../../components/attribute-values/attributeValuesForm";

import { deleteAttributeValue, getAllAttributeValues } from "../../api/attributeValuesApi";

export default function AdminAttributeValues() {

    const [attributeValues, setAttributeValues] = useState([]);

    const [editAttributeValue, setEditAttributeValue] = useState(null);

    useEffect(() => {
        fetchAllAttributeValues();
    }, [])

    const fetchAllAttributeValues = async () => {
        try {
            const res = await getAllAttributeValues();
            setAttributeValues(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteAttributeValue(id);
            fetchAllAttributeValues();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (edit) => {
        setEditAttributeValue(edit)
    }

    return (
        <div className="attributeValues-dash">
            <div className="attributeValues-dash-header">
                <h4>Attribute Values Management</h4>
            </div>
            <div className="attributeValues-dash-form">
                <AttributeValuesForm 
                    onSuccess={fetchAllAttributeValues} 
                    editAttributeValue={editAttributeValue} 
                    setEditAttributeValue={setEditAttributeValue} 
                />
            </div>
            <div className="attributeValues-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Attribute Name</th>
                            <th>Value</th>
                            <th>Create At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributeValues.map((attributeValue, index) => (
                            <tr key={attributeValue.id}>
                                <td>{index + 1}</td>
                                <td>{attributeValue.attribute_name}</td>
                                <td>{attributeValue.value}</td>
                                <td>{new Date(attributeValue.created_at).toLocaleDateString()}</td>
                                <td>{new Date(attributeValue.updated_at).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => setEditAttributeValue(attributeValue)}>Edit</button>
                                    <button onClick={() => handleDelete(attributeValue.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}