import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../shared/guards/ProtectedRoute";

import authRoutes from "../features/auth/routes";

import customerRoutes from "../customer/routes";

import adminRoutes from "../admin/routes";

export default function AppRouter() {
    
    const routes = [

        ...authRoutes,

        ...customerRoutes,

        ...adminRoutes
    ]

    return useRoutes(routes)
}