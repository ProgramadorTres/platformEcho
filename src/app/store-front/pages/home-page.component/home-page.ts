
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartComponent } from '@products/components/product-cart.component/product-cart.component';

//import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsSErvice } from '@products/services/products.services';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';


interface ProductsRequest {
  limit: number;
  offset: number;
  gender: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProductCartComponent, PaginationComponentComponent],
  styleUrls: ['../../../utilities/fade-in-utility.css'],
  templateUrl: './home-page.html',
})
export class HomePage {
  private productsService = inject(ProductsSErvice);
  //products = signal<Product[]>([]);
  //isLoading = signal(true);

  /*
  activateRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activateRoute.queryParamMap.pipe(
      map (params => params.get('page')  ? +params.get('page')! : 1  ),  //puede ser null
      map( page=> isNaN(page) ? 1 : page )
    ),
    {
      initialValue : 1,
    }
  )
*/
  paginationService = inject(PaginationService);




  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 10
      });
    },
  });



}
