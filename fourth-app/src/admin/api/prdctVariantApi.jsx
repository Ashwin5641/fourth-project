import api from "../../api/axios";

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}

export const getProductAttributes = async (product_id) => {
    const res = await api.get(`/admin/product-variant/product/${product_id}/attributes`);
    return res;
}

export const createProductVariant = async (form) => {
    const res = await api.post('/admin/product-variant', form);
    return res;
}

export const getAllProductVariants = async () => {
    const res = await api.get('/admin/product-variant');
    return res
}

export const deleteProductVariant = async (id) => {
    const res = await api.delete(`/admin/product-variant/${id}`);
    return res;
}

export const updateProductVariant = async (id, form) => {
    const res = await api.put(`/admin/product-variant/${id}`, form);
    return res;
}