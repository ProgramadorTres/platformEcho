import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contratista } from 'src/app/contractors/interfaces/contratista.interface';
import { TipoDocumento } from 'src/app/contractors/interfaces/tipoDocumento.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class TypeIdentificationsService {

  private http = inject(HttpClient);

  getAllTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${baseUrl}/tipos-identificaciones`).pipe(
      tap(resp => console.log('tipos-identificaciones recibidos:', resp))
    );
  }

  getTiposDocumentosById(id: number): Observable<TipoDocumento> {

    return this.http.get<TipoDocumento>(`${baseUrl}/tipos-identificaciones/${id}`)
      .pipe(
        tap((tipIdentification) => {
          console.log(`identificaciones por id   ${tipIdentification.tipo_identificacion}`);
        }
        ));
  }


}
