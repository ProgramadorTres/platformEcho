import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";
import { isAdminGuard } from "@auth/guards/is-admin.guard";
import { Contractors } from "./pages/contractors-admin-page/contractors";
import { ContractorAdminPage } from "./pages/contractor-admin-page/contractor-admin-page";


export const adminDashboardRoutes: Routes =[
    {
        path: '',
        component:AdminDashboardLayout,
        canMatch :[isAdminGuard],
        children:[

            {
                path:'contratistas',
                component: Contractors
            },
                    {
                path:'contratistas/:id',
                component: ContractorAdminPage
            },
            {
                path:'**',
                redirectTo: 'contratistas'
            }
        ]

    }
];

export default adminDashboardRoutes;