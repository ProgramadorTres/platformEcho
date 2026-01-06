import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsSErvice } from '@products/services/products.services';
import { map } from 'rxjs';
import { ProductDetaills } from "./product-detaills/product-detaills";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetaills],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsSErvice);


  productId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  productResource = rxResource(
    {
      request: () => ({ id: this.productId() }),
      //funcion a llamar
      loader: ({ request }) => {
        return this.productService.getProductById(request.id);
      }
    });



  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });

}
