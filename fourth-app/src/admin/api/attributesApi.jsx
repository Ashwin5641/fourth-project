import api from "../../api/axios";

export const createAttribute = async (form) => {
    const res = await api.post('/admin/attributes', form);
    return res;
}

export const getAllAttributes = async () => {
    const res = await api.get('/admin/attributes');
    return res;
}

export const deleteAttribute = async (id) => {
    const res = await api.delete(`/admin/attributes/${id}`);
    return res;
}

export const updateAttribute = async (id, form) => {
    const res = await api.put(`/admin/attributes/${id}`, form);
    return res;
}