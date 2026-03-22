import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ProjectsContractsResponse, Contrato } from '../interfaces/projects-contracts.interface';
import { environment } from 'src/environments/environment';
import { Options } from '@shared/interfaces/paginator-options';
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


}
