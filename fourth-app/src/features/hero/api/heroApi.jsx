import api from '../../../api/axios';

export const heroAdd = async (data) => {
    const res = await api.post('/admin/hero', data, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
    return res
}

export const getAllHeroes = async () => {
    const res = await api.get('/admin/hero');
    return res;
}