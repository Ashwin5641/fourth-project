import { useState } from "react";
import './adminSidebar.css'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div className="admin-sidebar">
            <h4>Admin Panel</h4>
            <ul>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Dashboard</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin/hero'}>Hero / Banners</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Categories</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Inventory / Stock</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Orders</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Dispatch / Shipping </Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Customers / Users</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Payments / Transactions</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Settings</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Admin Management</Link></li>
                <li><Link className="admin-sidebar-menu" to={'/admin'}>Logout</Link></li>
            </ul>
        </div>
    )
}