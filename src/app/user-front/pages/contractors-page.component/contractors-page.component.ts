import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PaginationComponentComponent } from '@shared/components/pagination-component/pagination-component.component';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { ContractorsSearch } from 'src/app/contractors/components/contractors-search/contractors-search';
import { ContractosTable } from 'src/app/contractors/components/contractos-table/contractos-table';
import { ContratistaService } from 'src/app/contractors/services/contratista.service';

@Component({
  selector: 'app-contractors-page.component',
  imports: [PaginationComponentComponent,ContractosTable, ContractorsSearch],
  templateUrl: './contractors-page.component.html',
})
export class ContractorsPageComponent {
    router = inject(Router);
    contractorsService = inject(ContratistaService);
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
        return this.contractorsService.getContractors({   
          offset: request.page * request.limit,
          limit: request.limit,
          search: request.term 
        });
      },
    });
  
    filteredProducts = computed(() => this.contractorssResource.value()?.contratistas ?? []);  
  
    onSearch(term: string) {
      const cleanTerm = term ? term : '';
        this.searchContractor.set(cleanTerm);
      this.router.navigate([], {
        queryParams: { page: 1 },
        queryParamsHandling: 'merge'
      });
    }
  
 }
