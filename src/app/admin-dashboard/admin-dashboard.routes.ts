import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";
import { isAdminGuard } from "@auth/guards/is-admin.guard";
import { Contractors } from "./pages/contractors/contractors";


export const adminDashboardRoutes: Routes =[
    {
        path: '',
        component:AdminDashboardLayout,
        canMatch :[isAdminGuard],
        children:[
            {
                path: 'products',
                component: ProductsAdminPage
            },
            {
                path: 'products/:id',
                component: ProductAdminPage
            },
            {
                path:'contratistas',
                component: Contractors
            },
            {
                path:'**',
                redirectTo: 'products'
            }
        ]

    }
];

export default adminDashboardRoutes;