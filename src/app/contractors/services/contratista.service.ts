import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Contratistaa, TipoIdentificacion } from '../interfaces/contratista.interface';
import { TipoDocumento } from '../interfaces/tipoDocumento.interface';
import { ContratistasResponse } from '../interfaces/contratistasResponse.interface';
import { Options } from '@shared/interfaces/paginator-options';
import { ContractorList } from '../interfaces/contractor-list';

const baseUrl = environment.baseUrl;

const emptyContratista: Contratistaa = {
  id_contratista: 0,
  tipo_persona: '',
  tipoIdentificacion: {} as TipoIdentificacion,
  id_tipo_identificacion: 0,
  cedula_nit: 0,
  DV: null,
  otra_identificacion: null,
  nombre: '',
  telefono: '',
  direccion: '',
  municipio: null,
  email: '',
  grupo_Rh: null,
  profesion: null,
  cargo: null,
  contacto_emergencia: null,
  celular_contacto_emerg: null,
  parentesco: null,
  fecha_actualización: '',
  version_row: null
};

@Injectable({ providedIn: 'root' })

export class ContratistaService {

  private http = inject(HttpClient);

  private contractorsCache = new Map<string, ContratistasResponse>();

  private contractorCache = new Map<number, Contratistaa>();

  getContractors(options: Options): Observable<ContratistasResponse> {
    const { limit = 10, offset = 0, search = '' } = options;

    const key = `${limit}-${offset}-${search || 'all'}`; // string key

    if (this.contractorsCache.has(key)) {
      return of(this.contractorsCache.get(key)!);
    }

    const params: any = { limit, offset };
    if (search) params.search = search;

    return this.http.get<ContratistasResponse>(`${baseUrl}/contratistas/paginator`, { params })
      .pipe(
        tap((resp) => {
          this.contractorsCache.set(key, resp);
        })
      );
  }

  getAllContratistas(): Observable<Contratistaa[]> {
    return this.http.get<Contratistaa[]>(`${baseUrl}/contratistas`);
  }


  getAllContratistasList(): Observable<ContractorList[]> {
    return this.http.get<ContractorList[]>(`${baseUrl}/contratistas/list`);
  }

  getAllTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${baseUrl}/tipos-identificaciones`)
      .pipe(tap(resp => console.log('Tipos recibidos:', resp)));
  }

  getContratistaById(id: number | 'new'): Observable<Contratistaa> {
    if (id === 'new') {
      return of(emptyContratista);
    }

    if (this.contractorCache.has(id)) {
      console.log("AQyu cahe");

      return of(this.contractorCache.get(id)!);
    }

    return this.http.get<Contratistaa>(`${baseUrl}/contratistas/${id}`)
      .pipe(
        //delay(150),
        tap((contratista) => {
          console.log(`contratista   ${contratista.nombre}`);
          this.contractorCache.set(contratista.id_contratista, contratista)
        }
        ));
  }

  createContratista(contratistaLike: Partial<Contratistaa>): Observable<Contratistaa> {

    console.log("contratista a cerar ", contratistaLike);


    return this.http.post<Contratistaa>(`${baseUrl}/contratistas/`, contratistaLike)
      .pipe(
        tap((contratista) => this.updateContractorCache(contratista))
      );
  }

  updateContratista(id: number, contratistaLike: Partial<Contratistaa>): Observable<Contratistaa> {
    return this.http.patch<Contratistaa>(`${baseUrl}/contratistas/${id}`, contratistaLike)
      .pipe(
        tap((contratista) => this.updateContractorCache(contratista))
      );
  }

  private updateContractorCache(contratista: Contratistaa) {
    const contractorId = contratista.id_contratista;
    this.contractorCache.set(contractorId, contratista);

    if (contractorId !== 0) { // 0 = "new"
      this.contractorsCache.forEach(response => {
        response.contratistas = response.contratistas.map((current) =>
          current.id_contratista === contractorId ? contratista : current
        );
      });
    }

    console.log('Cache de contratistas actualizado.');

  }
}