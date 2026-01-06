import { Routes } from '@angular/router';
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
    loadChildren: ()=> import('./admin-dashboard/admin-dashboard.routes')
  },

  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
