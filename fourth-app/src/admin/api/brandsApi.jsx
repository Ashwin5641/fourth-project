import api from "../../api/axios";

export const createBrand = async (formData) => {
    const res = await api.post("/admin/brands", formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
    return res;
};

export const getAllBrands = async (search = '') => {
    const res = await api.get('/admin/brands', {
        params: {
            search
        }
    });
    return res;
}

export const deleteBrand = async (id) => {
    const res = await api.delete(`/admin/brands/${id}`);
    return res;
}

export const updateBrand = async (id, formData) => {
    const res = await api.put(`/admin/brands/${id}`, formData);
    return res;
} 