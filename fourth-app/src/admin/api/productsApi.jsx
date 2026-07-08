import api from "../../api/axios";

export const getAllCategories = async () => {
    const res = await api.get('/admin/category');
    return res
}

export const getAllBrands = async () => {
    const res = await api.get('/admin/brands');
    return res;
}

export const createProducts = async (form) => {
    const res = await api.post('/admin/products', form);
    return res;
}

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}

export const deleteProduct = async (id) => {
    const res = await api.delete(`/admin/products/${id}`)
}

export const updateProduct = async (id, form) => {
    const res = await api.put(`/admin/products/${id}`, form)
}