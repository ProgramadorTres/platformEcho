import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Contratista } from '../interfaces/contratista.interface';
import { TipoDocumento } from '../interfaces/tipoDocumento.interface';
import { ContratistasResponse } from '../interfaces/contratistasResponse.interface';

//import { TipoDocumento } from '../interfaces/tipoDocumento.interface';
//import { ContratistasResponse } from '../interfaces/contratistasResponse.interface';

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


    getProducts(options: Options): Observable<ContratistasResponse> {
      
      //console.log("SE disparo!");
      // ⬅️ CORRECCIÓN AQUÍ
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

    



}