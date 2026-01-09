import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponentComponent } from '@shared/components/pagination-component/pagination-component.component';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { Contratista } from 'src/app/juridica/interfaces/contratista.interface';
import { ContratistaService } from 'src/app/juridica/services/contratista.service';

@Component({
  selector: 'contractors',
  imports: [PaginationComponentComponent],
  templateUrl: './contractors.html',
})
export class Contractors {
  contractorsService = inject(ContratistaService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);
  allContractors = signal<Contratista[]>([]);

  contractorssResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
      //term: this.searchTerm()
    }),
    loader: ({ request }) => {
      return this.contractorsService.getContractors({   //all is used for lists
        offset: request.page * request.limit,
        limit: request.limit,
        //search: request.term // Enviamos el término al backend
      });
    },
  });


}
