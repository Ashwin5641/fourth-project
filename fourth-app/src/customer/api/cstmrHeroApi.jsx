import api from "../../api/axios";

export const getAllHeroes = async () => {
    const res = await api.get('/admin/hero');
    return res;
}