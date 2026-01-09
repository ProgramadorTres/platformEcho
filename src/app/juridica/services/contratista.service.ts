import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Contratista } from '../interfaces/contratista.interface';
import { TipoDocumento } from '../interfaces/tipoDocumento.interface';
import { ContratistasResponse } from '../interfaces/contratistasResponse.interface';

const baseUrl = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  search?: string;
}


@Injectable({ providedIn: 'root' })

export class ContratistaService {
  private http = inject(HttpClient);

  // Servicio para traer todos los contratistas SIN opciones
  getAllContratistas(): Observable<Contratista[]> {
    return this.http.get<Contratista[]>(`${baseUrl}/contratistas`).pipe(
      // tap(resp => console.log('Contratistas recibidos:', resp))
    );
  }

  getAllTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${baseUrl}/tipos-identificaciones`).pipe(
      tap(resp => console.log('tipos-identificaciones recibidos:', resp))
    );
  }


  // Caché para contratistas (análogo a productsCache)
  private contractorsCache = new Map<string, ContratistasResponse>();

  getContractors(options: Options): Observable<ContratistasResponse> {

    const { limit = 10, offset = 0, search = '' } = options;

    // Generar llave única para el caché
    const key = `${limit}-${offset}-${search || 'all'}`;
    //console.log(this.contractorsCache.entries());

    // Si ya existe en caché, retornamos el observable de los datos guardados
    if (this.contractorsCache.has(key)) {
      return of(this.contractorsCache.get(key)!);
    }

    // 2. Construimos los parámetros dinámicamente
    const params: any = { limit, offset };

    if (search) params.search = search;

    return this.http.get<ContratistasResponse>(`${baseUrl}/contratistas/paginator`, { params })
      .pipe(
        tap((resp) => {
          console.log(`response ${resp}`);
          // Solo guardamos en cache si NO es una búsqueda muy específica 
          // o guárdalo siempre, pero con la llave que incluye 'search'
          this.contractorsCache.set(key, resp);
        })
      );
  }


}