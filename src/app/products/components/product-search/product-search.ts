import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsSErvice } from '@products/services/products.services';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'product-search',
  imports: [
    ReactiveFormsModule],
  templateUrl: './product-search.html',
})
export class ProductSearch {
  productService = inject(ProductsSErvice);
  searchControl = new FormControl('');

  @Output() search = new EventEmitter<string>();

constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(value => {
      // Si el valor es null o undefined (al limpiar con X), enviamos string vacío
      this.search.emit(value ?? '');
    });
  }
}