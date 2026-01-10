import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsSErvice } from '@products/services/products.services';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ContratistaService } from '../../services/contratista.service';

@Component({
  selector: 'contractors-search',
  imports: [ReactiveFormsModule],
  templateUrl: './contractors-search.html',
})
export class ContractorsSearch { 

    contractService = inject(ContratistaService);
    searchControl = new FormControl('');
  
    @Output() search = new EventEmitter<string>();
    
  
  constructor() {
      this.searchControl.valueChanges.pipe(
        debounceTime(300), 
        distinctUntilChanged() 
      ).subscribe(value => {
        // Si el valor es null o undefined (al limpiar con X), enviamos string vacío
        console.log(`Quien llego ${value}`);
        
        this.search.emit(value ?? '');
      });
    }
}
