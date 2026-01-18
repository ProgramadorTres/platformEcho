import { Component, EventEmitter, inject, Output } from '@angular/core';
import { OrganizationService } from '../../services/organization';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'organizations-search',
  imports: [ReactiveFormsModule],
  templateUrl: './organizations-search.html',
})
export class OrganizationsSearch {
  
  organizationService = inject(OrganizationService);
  searchControl = new FormControl('');
  @Output() search = new EventEmitter<string>();
  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(180),
      distinctUntilChanged()
    ).subscribe(value => {
      // Si el valor es null o undefined (al limpiar con X), enviamos string vacío
      //console.log(`Quien llego ${value}`);

      this.search.emit(value ?? '');
    });
  }


}
