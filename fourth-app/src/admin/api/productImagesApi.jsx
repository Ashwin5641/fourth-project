import api from "../../api/axios";

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}

export const createProductImages = async (formData) => {
    const res = await api.post('/admin/product-images', formData);
    return res;
}

export const getAllProductImages = async () => {
    const res = await api.get('/admin/product-images');
    return res;
}

export const deleteProductImage = async (id) => {
    const res = await api.delete(`/admin/product-images/${id}`);
    return res;
}

export const updateProductImage = async (id, formData) => {
    const res = await api.put(`/admin/product-images/${id}`, formData);
    return res;
}