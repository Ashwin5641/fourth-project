import api from "../../api/axios";

export const getAllCategories = async () => {
    const res = await api.get('/admin/category');
    return res;
}

export const getAllAttributes = async () => {
    const res = await api.get('/admin/attributes');
    return res;
}

export const createCategoryAttribute = async (form) => {
    const res = await api.post('/admin/category-attributes', form);
    return res;
}

export const getAllCategoryAttributes = async () => {
    const res = await api.get('/admin/category-attributes');
    return res;
}

export const deleteCategoryAttribute = async (id) => {
    const res = await api.delete(`/admin/category-attributes/${id}`);
    return res;
}

export const updateCategoryAttribute = async (id, form) => {
    const res = await api.put(`/admin/category-attributes/${id}`, form);
    return res;
}