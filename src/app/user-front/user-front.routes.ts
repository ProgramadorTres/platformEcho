
import { Routes } from "@angular/router";
import { UserFront } from "./layouts/user-front/user-front";

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
/*
    children : [
      {
          path: '',
          component: HomePage
      },
      {
          path: 'gender/:gender',
          component: GenderPageComponent
      },
      {
          path: 'product/:idSlug',
          component: ProductPageComponent
      },
      {
          path: '**',
          component: NotFoundPageComponent
      }
    ]*/
  },
  {
    path: '**',
    redirectTo : '',
  }
];


export default storeFrontRoutes;
