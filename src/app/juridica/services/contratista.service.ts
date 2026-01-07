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

/*
    getContractors(options: Options): Observable<ContratistasResponse> { // ⬅️ CORRECCIÓN AQUÍ
    //
    const { limit = 10, offset = 0 } = options;
   
    
    return this.http.get<ContratistasResponse>(`${baseUrl}/contratistas`, {
      params: {
        limit,
        offset

      }
    }).pipe(
      tap((resp) => console.log(resp))
    )
  }

    */

  /*
    getContractors(options: Options): Observable<ContratistasResponse> { // ⬅️ CORRECCIÓN AQUÍ
      //
      const { limit = 10, offset = 0 } = options;
      //console.log("GEnder ", gender);
      //almacenar paginacion en cache 
      
      
  
      const key = `${limit}-${offset}`;  //concatenmado creo una llave

  
      return this.http.get<ContratistasResponse>(`${baseUrl}/contratistas`, {
        params: {
          limit,
          offset,
  
        }
      }).pipe(
        tap((resp) => console.log(resp)),
        //tap((resp) => this.productsCache.set(key,resp)  )
      )
    }
*/

// Caché para contratistas (análogo a productsCache)
  private contractorsCache = new Map<string, ContratistasResponse>();

  getContractors(options: Options): Observable<ContratistasResponse> {
    const { limit = 10, offset = 0 } = options;
    
    // Generar llave única para el caché
    const key = `${limit}-${offset}`; 

    // Si ya existe en caché, retornamos el observable de los datos guardados
    if (this.contractorsCache.has(key)) {
      return of(this.contractorsCache.get(key)!);
    }

    return this.http.get<ContratistasResponse>(`${baseUrl}/contratistas/paginator`, {
      params: { limit, offset }
    }).pipe(
      tap(resp => console.log('Respuesta:', resp)),
      // Guardamos en caché antes de devolver la respuesta
      tap(resp => this.contractorsCache.set(key, resp))
    );
  }


}