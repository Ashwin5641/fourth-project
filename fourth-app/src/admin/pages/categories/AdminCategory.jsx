import { useEffect, useState } from "react";
import './adminCategory.css';

import CategoryForm from "../../components/categories/CategoryForm";

import { getAllCategoriesWithParent, deleteCategory } from "../../api/categoryApi";

export default function AdminCategory() {

    const [categories, setCategories] = useState([]);

    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await getAllCategoriesWithParent();
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

    const onEditCategory = async (edit) => {
        setEditCategory(edit)
    }

    return (
        <>
            <div className="category-dash">
                <div className="category-dash-header">
                    <h4>Category Management</h4>
                </div>
                <div className="category-dash-form">
                    <CategoryForm onSuccess={fetchCategories} categories={categories} editCategory={editCategory} setEditCategory={setEditCategory} />
                </div>
                <div className="category-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Parent Name</th>
                                <th>Great Parent</th>
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
                                    <td>{category.parent_name}</td>
                                    <td>{category.grandparent_name}</td>
                                    <td>{category.image}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button onClick={() => onEditCategory(category)}>Edit</button>
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