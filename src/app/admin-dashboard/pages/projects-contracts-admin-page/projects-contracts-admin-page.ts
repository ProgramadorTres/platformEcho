import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { ProjectsContractsServiceTs } from 'src/app/projects-contracts/services/projects-contracts.service.ts';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { ProjectsContractsTable } from 'src/app/projects-contracts/components/projects-contracts-table/projects-contracts-table';
import { SearchComponent } from '@shared/components/search-component/search-component';

@Component({
  selector: 'projects-contracts-admin',
  imports: [PaginationComponentComponent, RouterLink, ProjectsContractsTable, SearchComponent],
  templateUrl: './projects-contracts-admin-page.html',
})
export class ProjectsContractsAdminPage {
  titlePage: string = 'Listado de contratos';
  router = inject(Router);
  contractorsService = inject(ProjectsContractsServiceTs);
  paginationService = inject(PaginationService);
  contractsPerPage = signal(10);
  searchContractor = signal('');

  contractorssResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.contractsPerPage(),
      term: this.searchContractor()
    }),
    loader: ({ request }) => {

      return this.contractorsService.getOProjectsContracts({
        offset: request.page * request.limit,
        limit: request.limit,
        search: request.term 
      });
    },
  });

  filteredProducts = computed(() => this.contractorssResource.value()?.contratos ?? []);

  onSearch(term: string) {
    console.log("Entra aqui");
    
    const cleanTerm = term ? term : '';
    this.searchContractor.set(cleanTerm);
    this.router.navigate([], {
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }

}
