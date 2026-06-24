import api from '../../../api/axios';

export const getAllHeroes = async () => {
    const res = await api.get('/admin/hero');
    return res;
}

export const heroAdd = async (data) => {
    const res = await api.post('/admin/hero', data, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
    return res;
}

export const heroUpdate = async (id, data) => {
    const res = await api.put(`/admin/hero/${id}`, data, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
    return res;
}

export const heroDelete = async (id) => {
    const res = await api.delete(`/admin/hero/${id}`);
    return res;
}