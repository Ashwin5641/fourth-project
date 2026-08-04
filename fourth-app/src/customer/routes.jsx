import CustomerLayout from "./layout/CustomerLayout";

import Home from "./pages/home/Home";

const customerRoutes = [
    {
        path: '/',
        element: <CustomerLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]

export default customerRoutes;