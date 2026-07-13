import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "../shared/guards/ProtectedRoute";

import HeroDashboard from "../features/hero/pages/HeroDashboard";

import AdminCategory from "./pages/categories/AdminCategory";
import AdminBrands from "./pages/brands/AdminBrands";
import AdminProducts from "./pages/products/AdminProducts";
import ProductImages from "./pages/product-images/ProductImages";
import AdminAttributes from "./pages/attributes/AdminAttributes";
import AdminAttributeValues from "./pages/attribute-values/AdminAttributeValues";

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
            },
            {
                path: 'categories',
                element: <AdminCategory />
            }, 
            {
                path: 'brands',
                element: <AdminBrands />
            },
            {
                path: 'products',
                element: <AdminProducts />
            },
            {
                path: 'product-images',
                element: <ProductImages />
            },
            {
                path: 'attributes',
                element: <AdminAttributes />
            },
            {
                path: 'attribute-values',
                element: <AdminAttributeValues />
            }
        ]
    }
]

export default adminRoutes;