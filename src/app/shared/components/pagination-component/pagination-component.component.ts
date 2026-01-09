import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination-component.component.html',
  styleUrl: './pagination-component.component.css'
})
export class PaginationComponentComponent {
  /*pages = input(0); //si no tengo paginas no muestro nada
  currentPage = input<number>(1);
  activePAge = linkedSignal(this.currentPage);

  getPAgeList = computed (()=>{
    return Array.from({length:this.pages()},(_,i)=> i+1 )
  });
*/


  pages = input(0); 
  currentPage = input<number>(1);
  activePAge = linkedSignal(this.currentPage);

  getPAgeList = computed(() => {
    const current = this.activePAge();
    const total = this.pages();
    const radio = 2; // Cantidad de números a los lados de la página actual

    // CALCULAMOS EL RANGO CERCANO
    let start = Math.max(1, current - radio);
    let end = Math.min(total, current + radio);

    // Ajuste para mostrar siempre 5 números si es posible
    if (current <= radio) {
      end = Math.min(5, total);
    } else if (current > total - radio) {
      start = Math.max(1, total - 4);
    }

    // AHORA EL ARRAY SOLO TIENE LOS NÚMEROS DEL RANGO, NO TODOS
    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  });
}
