import { useState } from "react";
import './adminLayout.css';
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}