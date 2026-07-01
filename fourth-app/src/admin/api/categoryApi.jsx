import api from "../../api/axios";

export const getAllCategories = async () => {
    const res = await api.get('/admin/category');
    return res;
}

export const createCategory = async (formData) => {
    const res = await api.post('/admin/category', formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
    return res;
}

export const deleteCategory = async (id) => {
    const res = await api.delete(`/admin/category/${id}`);
    return res;
}
