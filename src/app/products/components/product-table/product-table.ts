 import { Component, inject, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from "../../pipes/product-image.pipe";
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe,RouterLink,CurrencyPipe,CommonModule],
  templateUrl: './product-table.html',
})
export class ProductTable { 
  products = input.required<Product[]>();
  paginationService = inject(PaginationService);
  isHovered: any;
}
