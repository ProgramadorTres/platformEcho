import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Options } from '@shared/interfaces/paginator-options';
import { Observable, of, tap } from 'rxjs';
import { Organization, OrganizationsResponse } from '../interfaces/organizations.interface';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private http = inject(HttpClient);
  private organizationsCache = new Map<string, OrganizationsResponse>();

  private organizationCache = new Map<number, Organization>();

  getOrganizations(options: Options): Observable<OrganizationsResponse> {
    const { limit = 10, offset = 0, search = '' } = options;

    const key = `${limit}-${offset}-${search || 'all'}`; // string key

    if (this.organizationsCache.has(key)) {
      return of(this.organizationsCache.get(key)!);
    }

    const params: any = { limit, offset };
    if (search) params.search = search;

    return this.http.get<OrganizationsResponse>(`${baseUrl}/organizaciones/paginator`, { params })
      .pipe(
        tap((resp) => {
          this.organizationsCache.set(key, resp);
        })
      );
  }

}
