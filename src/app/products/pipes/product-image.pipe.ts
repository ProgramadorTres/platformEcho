import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {

    if (value === null) {
      return './assets/images/no-image.jpg';
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }
    if (!value || value.length === 0) {
      return './assets/images/no-image.jpg';
    }

    const image = value[0];


    return `${baseUrl}/files/product/${image}`;
  }

}
