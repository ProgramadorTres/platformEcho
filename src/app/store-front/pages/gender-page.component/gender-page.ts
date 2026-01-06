import { Component, inject } from '@angular/core';
/*
import { Resource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsSErvice } from '@products/services/products.services';
*/


import { ActivatedRoute } from '@angular/router';
import { ProductCartComponent } from '@products/components/product-cart.component/product-cart.component';
import { ProductsSErvice } from '@products/services/products.services';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { PaginationService } from '@shared/components/pagination-component/pagination.service';


@Component({
  selector: 'app-gender-page',
    imports: [ProductCartComponent, PaginationComponentComponent],
  templateUrl: './gender-page.html',
  styleUrls: []
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsSErvice);
  paginationService = inject(PaginationService);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));


  //pials con esto
    productsResource = rxResource({
    request: () => ({ gender: this.gender() , page:this.paginationService.currentPage() -1}),
    //cambio disparo la peticion
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset : request.page * 10
      });
    },
  });



}