import { useEffect, useState } from "react";
import './adminCategory.css';

import CategoryForm from "../../components/categories/CategoryForm";

import { getAllCategories, deleteCategory } from "../../api/categoryApi";

export default function AdminCategory() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="category-dash">
                <div className="category-dash-header">
                    <h4>Category Management</h4>
                </div>
                <div className="category-dash-form">
                    <CategoryForm onSuccess={fetchCategories} categories={categories} />
                </div>
                <div className="category-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Parent Id</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.slug}</td>
                                    <td>{category.parent_id}</td>
                                    <td>{category.image}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button onClick={() => handleDelete(category.id)}>Delete</button>
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