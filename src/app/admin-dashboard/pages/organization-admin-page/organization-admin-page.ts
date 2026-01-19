import { Component, inject } from '@angular/core';
import { OrganizationDetaill } from "./organization-detaill/organization-detaill";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/organizations/services/organizations';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'organization-admin-page',
  imports: [OrganizationDetaill, CommonModule],
  templateUrl: './organization-admin-page.html',
})
export class OrganizationAdminPage {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  organizationService = inject(OrganizationService);

  organizationId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  organizationResource = rxResource(
    {
      request: () => ({ id: this.organizationId() }),
      //funcion a llamar
      loader: ({ request }) => {
        return this.organizationService.getCrganizationsById(request.id) //  (request.id);
      }
    });



}
