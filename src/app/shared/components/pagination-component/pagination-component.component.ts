import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination-component.component.html',
  styleUrl: './pagination-component.component.css'
})
export class PaginationComponentComponent {
  pages = input(0); //si no tengo paginas no muestro nada
  currentPage = input<number>(1);
  activePAge = linkedSignal(this.currentPage);

  getPAgeList = computed (()=>{
    return Array.from({length:this.pages()},(_,i)=> i+1 )
  });
}
