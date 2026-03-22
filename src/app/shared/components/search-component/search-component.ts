import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'search-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-component.html',
})
export class SearchComponent {
  searchControl = new FormControl('');
  @Output() search = new EventEmitter<string>();
  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(180),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value ?? '');
    });
  }
}
