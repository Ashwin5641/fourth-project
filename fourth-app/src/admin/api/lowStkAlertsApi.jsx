import api from "../../api/axios";

export const getLowStkProduct = async () => {
    const res = await api.get('/admin/low-stock-alerts');
    return res;
}
