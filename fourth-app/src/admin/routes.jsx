import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "../shared/guards/ProtectedRoute";

import HeroDashboard from "../features/hero/pages/HeroDashboard";

const adminRoutes = [
    {
        path: '/admin',
        element: (
            <ProtectedRoute role={'admin'}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <div>Admin Dashboard</div>
            },
            {
                path: 'hero',
                element: <HeroDashboard />
            }
        ]
    }
]

export default adminRoutes;