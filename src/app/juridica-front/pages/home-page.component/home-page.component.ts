import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule , JsonPipe} from '@angular/common';


import { ContratistasComponent } from "src/app/juridica/components/contratistas.component/contratistas.component";
import { ContratistaService } from 'src/app/juridica/services/contratista.service';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";


@Component({
  selector: 'juridica-home-page.component',
  imports: [ContratistasComponent, PaginationComponentComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private contractorsService = inject(ContratistaService);
  paginationService = inject(PaginationService);
  

/*  
    contractorsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.contractorsService.getContractors({
        offset: request.page * 10,
        limit: 10
      });
    },
  });
*/

// El recurso que reacciona al cambio de página
  contractorsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.contractorsService.getContractors({
        limit: 10,
        offset: request.page * 10
      });
    },
  });
  


 }
