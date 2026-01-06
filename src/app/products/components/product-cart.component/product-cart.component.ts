import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../interfaces/product.interface';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';


@Component({
  selector: 'product-cart',
  imports: [RouterLink, SlicePipe,ProductImagePipe],
  templateUrl: './product-cart.component.html',

  styles: [`
    .card {
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      cursor: pointer;
    }

    .card:hover {
      transform: scale(1.05) translateY(-5px);
      box-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
    }
  `],

})
export class ProductCartComponent {
  product = input.required<Product>();
  //prodyctUrl : string = `/product/${this.product().id}`

}
