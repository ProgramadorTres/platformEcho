import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ProjectsContractsResponse, Contrato } from '../interfaces/projects-contracts.interface';
import { environment } from 'src/environments/environment';
import { Options } from '@shared/interfaces/paginator-options';
import { emptyContract } from '../empty/project-contract-empty';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectsContractsServiceTs {

  private http = inject(HttpClient);
  //tarea
  private projectsContractsCache = new Map<string, ProjectsContractsResponse>();
  private contratonCache = new Map<number, Contrato>();

  getOProjectsContracts(options: Options): Observable<ProjectsContractsResponse> {
    const { limit = 10, offset = 0, search = '' } = options;

    const key = `${limit}-${offset}-${search || 'all'}`; // string key

    if (this.projectsContractsCache.has(key)) {
      return of(this.projectsContractsCache.get(key)!);
    }

    const params: any = { limit, offset };
    if (search) params.search = search;

    return this.http.get<ProjectsContractsResponse>(`${baseUrl}/proyectos-contratos/paginator`, { params })
      .pipe(
        tap((resp) => {
          this.projectsContractsCache.set(key, resp);
        })
      );
  }

  getOProjectsContractsById(id: number | 'new'): Observable<Contrato> {
    if (id === 'new') {
      return of(emptyContract);
    }
    if (this.contratonCache.has(id)) {
      return of(this.contratonCache.get(id)!);
    }
    return this.http.get<Contrato>(`${baseUrl}/proyectos-contratos/${id}`)
      .pipe(
        tap((cont) => {
          console.log(`org   ${cont}  `);
          this.contratonCache.set(cont.id_proyecto_contrat, cont)
        }
        ));
  }

  //projectContract
  createProjectContract(proContractLike: Partial<Contrato>): Observable<Contrato> {
    console.log("Crear contrato ", proContractLike);
    return this.http.post<Contrato>(`${baseUrl}/proyectos-contratos/`, proContractLike)
      .pipe(
        tap((contratista) => this.updateOrganizationCache(contratista))
      );
  }

  updateProjectContract( id: number, proContractLike: Partial<Contrato> ) : Observable<Contrato>{
     return this.http.patch<Contrato>(`${baseUrl}/proyectos-contratos/${id}`, proContractLike)
          .pipe(
            tap((contratista) => this.updateOrganizationCache(contratista))
          );
  }


  private updateOrganizationCache(org: Contrato) {
    const orContractId = org.id_proyecto_contrat;
    this.contratonCache.set(orContractId, org);

    if (orContractId !== 0) { // 0 = "new"
      this.projectsContractsCache.forEach(response => {
        response.contratos = response.contratos.map((current) =>
          current.id_proyecto_contrat === orContractId ? org : current
        );
      });
    }
    console.log('Cache de organizaciones actualizado updateOrganizationCache.');
  }

}
