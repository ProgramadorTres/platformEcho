import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { PaginationComponentComponent } from '@shared/components/pagination-component/pagination-component.component';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { OrganizationsSearch } from 'src/app/organizations/components/organizations-search/organizations-search';
import { OrganizationsTable } from 'src/app/organizations/components/organizations-table/organizations-table';
import { OrganizationService } from 'src/app/organizations/services/organizations';

@Component({
  selector: 'app-organizations-page.component',
  imports: [ PaginationComponentComponent, OrganizationsTable, OrganizationsSearch ],
  templateUrl: './organizations-page.component.html',
})
export class OrganizationsPageComponent { 

    router = inject(Router);
    organizationService = inject(OrganizationService);
    paginationService = inject(PaginationService);
    organizationsPerPage = signal(10);
    searchOrganization = signal('');
  
    organizationsResource = rxResource({
      request: () => ({
        page: this.paginationService.currentPage() - 1,
        limit: this.organizationsPerPage(),
        term: this.searchOrganization()
      }),
      loader: ({ request }) => {
        console.log("Organizations  ", request);
  
        return this.organizationService.getOrganizations({
          offset: request.page * request.limit,
          limit: request.limit,
          search: request.term
        });
      },
    });
  
    filteredOrganizations = computed(() => this.organizationsResource.value()?.organizaciones ?? []);
  
    onSearch(term: string) {
      const cleanTerm = term ? term : '';
      this.searchOrganization.set(cleanTerm);
      this.router.navigate([], {
        queryParams: { page: 1 },
        queryParamsHandling: 'merge'
      });
    }
}
