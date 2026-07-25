import api from "../../api/axios";

export const getStockDashboard = async (search = "") => {
    const res = await api.get('/admin/stock-dashboard', {
        params: {
            search
        }
    });
    return res;
}