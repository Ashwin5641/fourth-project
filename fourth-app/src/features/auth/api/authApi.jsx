import api from "../../../api/axios";

export const signup = async (data) => {
    try {
        const res = await api.post('/auth/signup', data);
        return res;
    } catch (err) {
        throw err
        console.error(err)
    }
}

export const login = async (data) => {
    try {
        const res = await api.post('/auth/login', data);
        return res;
    } catch (err) {
        throw err;
        console.error(err)
    }
}

