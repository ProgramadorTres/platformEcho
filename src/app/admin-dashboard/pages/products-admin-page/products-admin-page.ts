import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsSErvice } from '@products/services/products.services';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { Router, RouterLink } from "@angular/router";
import { ProductSearch } from "@products/components/product-search/product-search";
import { Product } from '@products/interfaces/product.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, PaginationComponentComponent, RouterLink, ProductSearch],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {

  productsService = inject(ProductsSErvice);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);

  searchTerm = signal('');
  allProducts = signal<Product[]>([]);
  router = inject(Router);
  //traiga y pagine

  // El recurso se dispara cada vez que cambie: page, limit o searchTerm
  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
      term: this.searchTerm()
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * request.limit,
        limit: request.limit,
        search: request.term // Enviamos el término al backend
      });
    },
  });

  // La tabla simplemente muestra lo que el recurso trae del server
  filteredProducts = computed(() => this.productsResource.value()?.products ?? []);

  onSearch(term: string) {

    const cleanTerm = term ? term.trim() : '';
    this.searchTerm.set(cleanTerm);


    this.router.navigate([], {
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  pagesNumber(pages: number) {

    this.productsPerPage.set(pages);
  }

}
