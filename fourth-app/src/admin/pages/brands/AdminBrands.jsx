import { useEffect, useState } from "react";
import './adminBrands.css';

import BrandsForm from "../../components/brands/BrandsForm";
import { deleteBrand, getAllBrands } from "../../api/brandsApi";

export default function AdminBrands() {

    const [getBrands, setGetBrands] = useState([]);
    const [editBrand, setEditBrand] = useState(null);

    const [search, setSearch] = useState('');
 
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAllBrands(search);
        }, 400);

        return () => clearTimeout(timer)
    }, [search])

    const fetchAllBrands = async (search = '') => {
        try {
            const res = await getAllBrands(search);
            setGetBrands(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteBrand(id);
            fetchAllBrands();
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = async (edit) => {
        setEditBrand(edit)
    }

    return (
        <div className="brands-dash">
            <div className="brands-dash-header">
                <h4>Brands Management</h4>
            </div>
            <div className="brands-dash-form">
                <BrandsForm onSuccess={fetchAllBrands} editBrand={editBrand} setEditBrand={setEditBrand} />
            </div>
            <div className="brands-dash-search">
                <input
                    type="text"
                    placeholder="Search brand or slug...."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="brands-dash-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getBrands.map((brand) => (
                            <tr key={brand.id}>
                                <td>{brand.name}</td>
                                <td>{brand.slug}</td>
                                <td>{brand.logo}</td>
                                <td>{brand.description}</td>
                                <td>
                                    <button onClick={() => handleEdit(brand)}>Edit</button>
                                    <button onClick={() => handleDelete(brand.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}