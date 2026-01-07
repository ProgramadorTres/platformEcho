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
    path:'admin',
    loadChildren: ()=> import('./admin-dashboard/admin-dashboard.routes'),
     canMatch: [AuthenticatedGuard] // solo si SÍ está autenticado

  },

  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
