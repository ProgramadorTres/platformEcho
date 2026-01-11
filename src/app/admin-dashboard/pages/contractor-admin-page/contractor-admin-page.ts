import { Component, effect, inject } from '@angular/core';
import { ContractorDetaill } from "./contractor-detaill/contractor-detaill";
import { CommonModule } from '@angular/common';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';
import { ContratistaService } from 'src/app/contractors/services/contratista.service';


@Component({
  selector: 'app-contractor-admin-page',
  imports: [
    CommonModule,
    ContractorDetaill,
  ],
  templateUrl: './contractor-admin-page.html',
})
export class ContractorAdminPage {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  contractortService = inject(ContratistaService);

  contractorId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  productResource = rxResource(
    {
      request: () => ({ id: this.contractorId() }),
      //funcion a llamar
      loader: ({ request }) => {
        return this.contractortService.getContratistaById(request.id);
      }
    });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/contratistas']);
    }
  });
}
