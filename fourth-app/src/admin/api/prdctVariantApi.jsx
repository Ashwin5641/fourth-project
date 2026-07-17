import api from "../../api/axios";

export const getAllProducts = async () => {
    const res = await api.get('/admin/products');
    return res;
}

export const getProductAttributes = async (product_id) => {
    const res = await api.get(`/admin/product-variant/product/${product_id}/attributes`);
    return res;
}