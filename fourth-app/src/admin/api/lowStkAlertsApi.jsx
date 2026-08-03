import api from "../../api/axios";

export const getLowStkProduct = async (search, page, sort, limit) => {
    const res = await api.get('/admin/low-stock-alerts', {
        params: {
            search,
            page,
            sort,
            limit
        }
    });
    return res;
}
