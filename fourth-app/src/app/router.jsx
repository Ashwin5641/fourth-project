import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../shared/guards/ProtectedRoute";

import authRoutes from "../features/auth/routes";

import UserLayout from "../shared/layouts/UserLayout";

import Home from "../pages/Home";

import Profile from "../pages/Profile";

import adminRoutes from "../admin/routes";

export default function AppRouter() {
    
    const routes = [

        ...authRoutes,

        {
            path: '/',
            element: <UserLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: 'profile',
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    )
                }
            ]
        },

        ...adminRoutes
    ]

    return useRoutes(routes)
}