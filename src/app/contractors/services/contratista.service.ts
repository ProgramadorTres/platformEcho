import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Contratista, TipoIdentificacion } from '../interfaces/contratista.interface';
import { TipoDocumento } from '../interfaces/tipoDocumento.interface';
import { ContratistasResponse } from '../interfaces/contratistasResponse.interface';

const baseUrl = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  search?: string;
}


const emptyContratista: Contratista = {
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

  private contractorCache = new Map<number, Contratista>();

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

  getAllContratistas(): Observable<Contratista[]> {
    return this.http.get<Contratista[]>(`${baseUrl}/contratistas`);
  }

  getAllTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${baseUrl}/tipos-identificaciones`)
      .pipe(tap(resp => console.log('Tipos recibidos:', resp)));
  }

  getContratistaById(id: number | 'new'): Observable<Contratista> {
    if (id === 'new') {
      return of(emptyContratista);
    }

    if (this.contractorCache.has(id)) {
      console.log("AQyu cahe");

      return of(this.contractorCache.get(id)!);
    }

    return this.http.get<Contratista>(`${baseUrl}/contratistas/${id}`)
      .pipe(
        delay(150),


        tap((contratista) => {
          console.log(`contratista   ${contratista.nombre}`);
          
          this.contractorCache.set(contratista.id_contratista, contratista)
        }


        ));
  }

  createContratista(contratistaLike: Partial<Contratista>): Observable<Contratista> {
    return this.http.post<Contratista>(`${baseUrl}/contratistas/`, contratistaLike)
      .pipe(
        tap((contratista) => this.updateContractorCache(contratista))
      );
  }

  updateContratista(id: number, contratistaLike: Partial<Contratista>): Observable<Contratista> {
    return this.http.patch<Contratista>(`${baseUrl}/contratistas/${id}`, contratistaLike)
      .pipe(
        tap((contratista) => this.updateContractorCache(contratista))
      );
  }

  private updateContractorCache(contratista: Contratista) {
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