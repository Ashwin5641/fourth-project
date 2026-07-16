import { useEffect, useState } from "react";
import './AdmCatgryAttributes.css'

import CategoryAttributesForm from "../../components/category-attributes/CategoryAttributesForm";

import { getAllCategoryAttributes, deleteCategoryAttribute } from "../../api/categoryAttributesApi";

export default function AdmCatgryAttributes() {

    const [categoryAttributes, setCategoryAttributes] = useState([]);

    const [editCategoryAttribute, setEditCategoryAttribute] = useState(null)

    useEffect(() => {
        fetchAllCategoryAttributes();
    }, [])

    const fetchAllCategoryAttributes = async () =>{
        try {
            const res = await getAllCategoryAttributes();
            setCategoryAttributes(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteCategoryAttribute(id);
            fetchAllCategoryAttributes();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (edit) => {
        setEditCategoryAttribute(edit)
    }

    return (
        <div className="categoryAttributes-dash">
            <div className="categoryAttributes-dash-header">
                <h4>Category Attributes Management</h4>
            </div>
            <div className="categoryAttributes-dash-form">
                <CategoryAttributesForm 
                    onSuccess={fetchAllCategoryAttributes} 
                    editCategoryAttribute={editCategoryAttribute}
                    setEditCategoryAttribute={setEditCategoryAttribute}    
                />
            </div>
            <div className="categoryAttributes-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Category Name</th>
                            <th>Attribute Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryAttributes.map((categoryAttribute, index) => (
                            <tr key={categoryAttribute.id}>
                                <td>{index + 1}</td>
                                <td>{categoryAttribute.category_name}</td>
                                <td>{categoryAttribute.attribute_name}</td>
                                <td>
                                    <button onClick={() => handleEdit(categoryAttribute)}>Edit</button>
                                    <button onClick={() => handleDelete(categoryAttribute.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}