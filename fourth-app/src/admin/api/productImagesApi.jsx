import api from "../../api/axios";

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}

export const createProductImages = async (formData) => {
    const res = await api.post('/admin/product-images', formData);
    return res;
}