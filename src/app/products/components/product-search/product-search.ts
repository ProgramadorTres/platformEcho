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
  //searchControl = new FormControl('');
  productService = inject(ProductsSErvice);

  /*
ngOnInit(): void {
  this.searchControl.valueChanges.subscribe(value => {
    if (value && value.length >= 3) {
      console.log('Texto buscado:', value);
      this.productService.getProdyctByIdSlug(value)
      .subscribe(
        product=>{
          console.log(product);
          
        }
      )

    }
  });
}*/

  searchControl = new FormControl('');

  @Output() search = new EventEmitter<string>();
/*
  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.search.emit(value ?? '');
    });
  }
*/
constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(400), // Espera 400ms tras dejar de escribir
      distinctUntilChanged() // Solo emite si el valor cambió
    ).subscribe(value => {
      // Si el valor es null o undefined (al limpiar con X), enviamos string vacío
      this.search.emit(value ?? '');
    });
  }
}