
import { Routes } from "@angular/router";
import { UserFront } from "./layouts/user-front/user-front";
import { ContractorsPageComponent } from "./pages/contractors-page.component/contractors-page.component";
import { ProductAdminPage } from "@dashboard/pages/product-admin-page/product-admin-page";

/*
import { StoreFrontLayaout } from './layouts/store-front-layaout/store-front-layaout';
import { HomePage } from "./pages/home-page.component/home-page";

import { ProductPageComponent } from "./pages/product-page.component/product-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page.component/not-found-page-component";
import { GenderPageComponent } from "./pages/gender-page.component/gender-page";
*/


export const storeFrontRoutes : Routes = [
  {
    path :'',
    component: UserFront,

    children : [
      {
          path: 'contratistas',
          component: ContractorsPageComponent
      },

      /*
      {
          path: '**',
          component: ContractorsPageComponent
      }*/
    ]
  },
  {
    path: '**',
    redirectTo : '',
  }
];


export default storeFrontRoutes;
