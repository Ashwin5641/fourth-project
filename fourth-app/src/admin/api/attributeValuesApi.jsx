import api from "../../api/axios";

export const getAllAttributes = async () => {
    const res = await api.get('/admin/attributes');
    return res;
}

export const createAttributeValue = async (form) => {
    const res = await api.post('/admin/attribute-values', form);
    return res;
}

export const getAllAttributeValues = async () => {
    const res = await api.get('/admin/attribute-values');
    return res
}

export const deleteAttributeValue = async (id) => {
    const res = await api.delete(`/admin/attribute-values/${id}`);
    return res;
}

export const updateAttributeValue = async (id, form) => {
    const res = await api.put(`/admin/attribute-values/${id}`, form);
    return res;
}