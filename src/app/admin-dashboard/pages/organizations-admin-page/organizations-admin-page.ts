import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { OrganizationService } from 'src/app/organizations/services/organizations';
import { PaginationComponentComponent } from "@shared/components/pagination-component/pagination-component.component";
import { OrganizationsTable } from "src/app/organizations/components/organizations-table/organizations-table";
import { OrganizationsSearch } from "src/app/organizations/components/organizations-search/organizations-search";
import { NacionalityOrganizationsServiceTs } from 'src/app/nacionality-organizations/services/nacionality-organizations.service.ts';
import { OrganizationsTypesServiceTs } from 'src/app/organizations-types/services/organizations-types.service.ts';
import { CountriesOrganizationsService } from 'src/app/countries-organizations/services/countries-organizations.service';


@Component({
  selector: 'organizations',
  imports: [PaginationComponentComponent, OrganizationsTable, RouterLink, OrganizationsSearch, NgSelectModule],
  templateUrl: './organizations-admin-page.html',

  styleUrl: './organizations-admin-page.css'
})
export class OrganizationsAdminPage {

  router = inject(Router);
  organizationService = inject(OrganizationService);
  paginationService = inject(PaginationService);
  organizationsPerPage = signal(10);
  searchOrganization = signal('');
  private listOrganizations = inject(NacionalityOrganizationsServiceTs);
  orgNationalitiesResource = rxResource({ loader: () => this.listOrganizations.getAllorgNationals() });
  selectedNationality = signal('');
  private listOrganizationsTypes = inject(OrganizationsTypesServiceTs);
  organizationsTypesResource = rxResource({ loader: () => this.listOrganizationsTypes.getAllorgNationals() });
  selectedTypeOrganization = signal('');
  private listCountries = inject(CountriesOrganizationsService);
  countriesResource = rxResource({ loader: () => this.listCountries.getAllorgCountries() });
  selectedCountry = signal('');

  organizationsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.organizationsPerPage(),
      term: this.searchOrganization(),
      nationality: this.selectedNationality(),
      organizationType: this.selectedTypeOrganization(),
      country : this.selectedCountry()

    }),
    loader: ({ request }) => {
      console.log("Organizations request", request);

      return this.organizationService.getOrganizations({
        offset: request.page * request.limit,
        limit: request.limit,
        search: request.term,
        nationality: request.nationality,
        organizationType: request.organizationType,
        country : request.country
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


  /*

  onNationalityChange(value: any) {
    console.log("Nacionalidad seleccionada:", value.nacionalidad_org);
    if (!value || !value.nacionalidad_org) {
      this.selectedNationality.set('');
      this.updateQueryParams();
      return;
    }
    this.selectedNationality.set(value.nacionalidad_org.trim());

    this.updateQueryParams();
  }

  onOrgTypeChange(value: any) {
    if (!value || !value.tipo_organización) {
      this.selectedTypeOrganization.set('');
      this.updateQueryParams();
      return;
    }
    console.log(`tipo d eorganizacion ${value.tipo_organización}`);

    this.selectedTypeOrganization.set(value.tipo_organización.trim());
    this.updateQueryParams();
  }

  onCountryChange(value: any) {
    if (!value || !value.país_organización) {
      this.selectedCountry.set('');
      this.updateQueryParams();
      return;
    }
    console.log("Pais seleccionado:", value.país_organización);
    this.selectedCountry.set(value.país_organización.trim());
    this.updateQueryParams();
  }
*/


onNationalityChange(value: any) {
  // Si value es null (se presionó la X), seteamos string vacío
  const newValue = value?.nacionalidad_org?.trim() ?? '';
  this.selectedNationality.set(newValue);
  this.updateQueryParams();
}

onOrgTypeChange(value: any) {
  const newValue = value?.tipo_organización?.trim() ?? '';
  this.selectedTypeOrganization.set(newValue);
  this.updateQueryParams();
}

onCountryChange(value: any) {
  const newValue = value?.país_organización?.trim() ?? '';
  this.selectedCountry.set(newValue);
  this.updateQueryParams();
}

  private updateQueryParams() {
    this.router.navigate([], {
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }
}



