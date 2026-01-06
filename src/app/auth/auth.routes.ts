import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout";
import { LoginPageComponent } from "./pages/login-page/login-page";
import { RegisterPageComponent } from "./pages/register-page/register-page";

export const authRoutes :Routes = [
    {
        path:'',
        component : AuthLayoutComponent,
        children : [
            {
                path: 'login',
                component:  LoginPageComponent
            },
            {
                path : 'registro',
                component: RegisterPageComponent
            },
            {
                path : '**',
                redirectTo : 'login'
            }
        ]
    }
]

//no hace falta el then
export default authRoutes;