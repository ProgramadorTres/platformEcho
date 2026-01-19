import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Options } from '@shared/interfaces/paginator-options';
import { Observable, of, tap } from 'rxjs';
import { Organization, OrganizationsResponse } from '../interfaces/organizations.interface';
const baseUrl = environment.baseUrl;

export const emptyOrganization: Organization = {
  no_organizacion: 0,
  id_organización: '',
  nombre_organización: '',
  NIT: 0,
  dígito_verificación_NIT: 0,
  nacionalidad_organización: '',
  identificación_otro: null,
  id_tipo_organizacion: 0,
  tipo_relación: '',
  temas_organización: '',
  posibilidad_asociación: '',
  posibilidad_asociación_sd: null,
  responsable_organización: '',
  teléfono_organización: null,
  "e-mail_organización": null,
  web_operador: null,
  Dirección: null,
  Ubicación: null,
  id_pais: 0,
  calificacion_tecnica: null,
  coment_calif_tecnica: null,
  calificacion_admin: null,
  coment_calif_admin: null,
  fechaActualizacion: new Date(),
  // Inicialización de interfaces anidadas
  versionRow: {
    type: 'Buffer',
    data: []
  },
  TiposOrganizacione: {
    ID: 0,
    tipo_organización: '',
    tipo_org_breve: '',
    id_pob_beneficiaria: null
  },
  nacionalidadOrganizacione: {
    nacionalidad_org: ''
  },
  paisesOrganizacion: {
    id_pais: 0,
    país_organización: ''
  }
};

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

  getCrganizationsById(id: number | 'new'): Observable<Organization> {
    if (id === 'new') {
      return of(emptyOrganization);
    }

    if (this.organizationCache.has(id)) {
      //console.log("AQyu cahe");

      return of(this.organizationCache.get(id)!);
    }

    return this.http.get<Organization>(`${baseUrl}/organizaciones/${id}`)
      .pipe(
        tap((org) => {
          console.log(`org   ${org}  `);
          this.organizationCache.set(org.no_organizacion, org)
        }
        ));
  }


  createOrganization(organizationLike: Partial<Organization>): Observable<Organization> {

    console.log("Organization a crear ", organizationLike);


    return this.http.post<Organization>(`${baseUrl}/organizaciones/`, organizationLike)
      .pipe(
        tap((contratista) => this.updateOrganizationCache(contratista))
      );
  }

  updateOrganization(id: number, organizationLike: Partial<Organization>): Observable<Organization> {
    return this.http.patch<Organization>(`${baseUrl}/organizaciones/${id}`, organizationLike)
      .pipe(
        tap((contratista) => this.updateOrganizationCache(contratista))
      );
  }

  private updateOrganizationCache(org: Organization) {
    const orgId = org.no_organizacion;
    this.organizationCache.set(orgId, org);

    if (orgId !== 0) { // 0 = "new"
      this.organizationsCache.forEach(response => {
        response.organizaciones = response.organizaciones.map((current) =>
          current.no_organizacion === orgId ? org : current
        );
      });
    }
    console.log('Cache de organizaciones actualizado.');

  }

}
