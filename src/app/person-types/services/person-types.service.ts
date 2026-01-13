import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TipoPersona } from 'src/app/contractors/interfaces/contratistasResponse.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class PersonTypesService {

    private http = inject(HttpClient);
  
  
    getAllTipePerons(): Observable<TipoPersona[]> {
      return this.http.get<TipoPersona[]>(`${baseUrl}/tipos-personas`).pipe(
        tap(resp => console.log('tipos-identificaciones recibidos   aqui:', resp))
      );
    }
  
  
    getTipePerosnsById(id: number): Observable<TipoPersona> {
  
      return this.http.get<TipoPersona>(`${baseUrl}/tipos-personas/${id}`)
        .pipe(
          tap((typePerson) => {
            console.log(`Tipo de persona por id   ${typePerson}`);
          }
          ));
    }
  

}
