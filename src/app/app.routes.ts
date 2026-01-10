import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards/autheticated.guard';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
  //order is imprtant
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //guards
    canMatch: [
      // ()=> {  return true; console.log('Hellow World')}, //false falla
      NotAuthenticatedGuard,
    ]
  },
  {
    path: 'admin',
    canMatch: [AuthenticatedGuard], // Si el token expiró, lo manda al login.
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes')
  },

  {
    path: '',
    canMatch: [AuthenticatedGuard], // Si el token expiró, lo manda al login.
    loadChildren: () => import('./user-front/user-front.routes')
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
