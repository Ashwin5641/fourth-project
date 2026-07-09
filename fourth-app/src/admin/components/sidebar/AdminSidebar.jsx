import { useState } from "react";
import './adminSidebar.css'
import { Link } from "react-router-dom";

const menus = [
    {
        title: 'Dashboard',
        path: '/admin'
    },
    {
        title: 'Catalog',
        children: [
            {
                title: 'Hero / Banner',
                path: '/admin/hero'
            },
            {
                title: 'Categories',
                path: '/admin/categories'
            },
            {
                title: 'Products',
                path: '/admin/products'
            },
            {
                title: 'Product Images',
                path: '/admin/product-images'
            },
            {
                title: 'Brands',
                path: '/admin/brands'
            }
        ]
    },
    {
        title: "Sales",
        children: [
            {
                title: "Orders",
                path: "/admin/orders"
            },
            {
                title: "Coupons",
                path: "/admin/coupons"
            }
        ]
    },
    {
        title: "Inventory",
        children: [
            {
                title: "Stock",
                path: "/admin/stock"
            }
        ]
    },
    {
        title: "Customers",
        children: [
            {
                title: "Customers",
                path: "/admin/customers"
            }
        ]
    },
    {
        title: "Shipping",
        children: [
            {
                title: "Dispatch",
                path: "/admin/shipping"
            }
        ]
    },
    {
        title: "Payments",
        children: [
            {
                title: "Transactions",
                path: "/admin/payments"
            }
        ]
    },
    {
        title: "Reports",
        path: "/admin/reports"
    },
    {
        title: "Settings",
        path: "/admin/settings"
    },
    {
        title: "Administration",
        children: [
            {
                title: "Admin Users",
                path: "/admin/admin-users"
            }
        ]
    },
    {
        title: "Logout",
        path: "/logout"
    }
]

export default function AdminSidebar() {

    const [openMenu, setMenuOpen] = useState(null);

    return (
        <div className="admin-sidebar">
            <h4>Admin Panel</h4>
            <ul>
                {menus.map((menu) => (
                    <li key={menu.title}>
                        {menu.children ? (
                            <>
                                <button
                                    className="admin-sidebar-parent"
                                    onClick={() =>
                                        setMenuOpen(openMenu === menu.title ? null : menu.title)
                                    }
                                >
                                    {menu.title}
                                </button>

                                {openMenu === menu.title && (
                                    <ul className="admin-sidebar-submenu">
                                        {menu.children.map((child) => (
                                            <li key={child.title}>
                                                <Link
                                                    to={child.path}
                                                    className="admin-sidebar-menu"
                                                >
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={menu.path}
                                className="admin-sidebar-menu"
                            >
                                {menu.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}