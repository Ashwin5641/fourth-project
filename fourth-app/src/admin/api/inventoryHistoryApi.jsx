import api from "../../api/axios";

export const getAllInvntryHistry = async (search, page, limit, sort) => {
    const res = await api.get('/admin/inventory-history', {
        params: {
            search,
            page,
            limit,
            sort
        }
    });
    return res;
}