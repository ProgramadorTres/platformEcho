import { Component, inject } from '@angular/core';
import { toSignal,rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProjectsContractsServiceTs } from 'src/app/projects-contracts/services/projects-contracts.service.ts';
import { ProjectContractDetail } from "./project-contract-detail/project-contract-detail";

@Component({
  selector: 'app-project-contract-admin-page',
  imports: [ProjectContractDetail],
  templateUrl: './project-contract-admin-page.html',
})
export class ProjectContractAdminPage {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  contractorsService = inject(ProjectsContractsServiceTs);

  contractorId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  contractorResource = rxResource(
  {
   
    request: () => ({ id: this.contractorId() }),
    loader: ({ request }) => {
      return this.contractorsService.getOProjectsContractsById(request.id) 
    }
  });

}
