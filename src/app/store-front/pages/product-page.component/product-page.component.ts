import { ProductCarruselComponent } from './../../../products/product-carrusel.component/product-carrusel.component';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Product } from '../../../products/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductsSErvice } from '@products/services/products.services';
import { switchMap, catchError, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


interface ProductResult {
  product: Product | null;
  error: string | null;
}


type ErrorType =
  | 'API_DOWN'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR'
  | null;

@Component({
  selector: 'product-page',
  imports: [ProductCarruselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  /*
  ProductId = input.required<string>();
  constructor() {
    console.log("Cabron " , this.ProductId );

  }

  activareRoute  = inject(ActivatedRoute);
  productService =inject(ProductsSErvice);
  productIdSlug   = this.activareRoute.snapshot.params['idSlug']; //any

  productResource = toSignal(
    this.productService.getProdyctByIdSlug(this.productIdSlug).pipe(
      catchError((error: Error) => {
        console.error('Error loading product:', error);
        return of(null);
      })
    ),
    { initialValue: null as Product | null }
  );

  product = this.productResource;
  loading = () => !this.productResource() && !this.error();
  error = () => {
    return null;
    };*/


  activareRoute = inject(ActivatedRoute);
  productService = inject(ProductsSErvice);

  productIdInput = input<string | undefined>(undefined);


  get productIdSlug(): string {
    return this.productIdInput() || this.activareRoute.snapshot.params['idSlug'];
  }


  private productData = toSignal(
    this.productService.getProdyctByIdSlug(this.productIdSlug).pipe(
      catchError((error: HttpErrorResponse | Error) => {
        console.error('Error loading product:', error);

        let errorType: ErrorType = 'UNKNOWN_ERROR';
        let errorMessage = error.message;

        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            errorType = 'API_DOWN';
            errorMessage = 'No se puede conectar con el servidor';
          } else if (error.status >= 500) {
            errorType = 'SERVER_ERROR';
            errorMessage = `Error del servidor (${error.status})`;
          } else if (error.status === 404) {
            errorType = 'NOT_FOUND';
            errorMessage = 'Producto no encontrado';
          } else if (error.status === 401 || error.status === 403) {
            errorType = 'UNAUTHORIZED';
            errorMessage = 'No autorizado';
          }
        }

        return of({ error: { type: errorType, message: errorMessage } });
      })
    ),
    { initialValue: null }
  );

  product = () => {
    const data = this.productData();
    return data && !('error' in data) ? data : null;
  };

  errorType = () => {
    const data = this.productData();
    return data && 'error' in data ? data.error.type : null;
  };

  errorMessage = () => {
    const data = this.productData();
    console.log("Error " , data);

    return data && 'error' in data ? data.error.message : null;
  };

  loading = () => this.productData() === null;

  constructor() {
    console.log("Product ID:", this.productIdSlug);
  }


}
