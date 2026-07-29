import api from "../../api/axios";

export const getStockDashboard = async (search = "") => {
    const res = await api.get('/admin/stock-dashboard', {
        params: {
            search
        }
    });
    return res;
}

export const updateStkOfPrdctVrnt = async (variant_id, payload) => {
    const res = await api.put(`/admin/stock-dashboard/product-variant/${variant_id}`, payload);
    return res;
}