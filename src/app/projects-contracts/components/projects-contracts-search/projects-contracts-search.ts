import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'projects-contracts-search',
  imports: [ReactiveFormsModule],
  templateUrl: './projects-contracts-search.html',
})
export class ProjectsContractsSearch {
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
