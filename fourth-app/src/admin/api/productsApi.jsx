import api from "../../api/axios";

export const getAllCategories = async () => {
    const res = await api.get('/admin/category');
    return res
}

export const getAllBrands = async () => {
    const res = await api.get('/admin/brands');
    return res;
}

export const createProducts = async (formData) => {
    const res = await api.post('/admin/products', formData);
    return res;
}

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}