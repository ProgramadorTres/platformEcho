import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsSErvice } from '@products/services/products.services';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, PaginationComponentComponent, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {

  productsService =   inject(ProductsSErvice);
  paginationService = inject(PaginationService);
  productsPerPage =   signal(10);


//traiga y pagine
  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 ,
      limit : this.productsPerPage()
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 10,
        limit: this.productsPerPage()
      });
    },
  });


  pagesNumber(pages:number) {
    console.log(`Cambiando a ${pages} - ${ this.productsPerPage()}`);
    
    this.productsPerPage.set(pages);
  }

}
