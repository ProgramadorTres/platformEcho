import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NacionalityOrg } from '../interfaces/nacionality-organizations.interface';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class NacionalityOrganizationsServiceTs {
  
      private http = inject(HttpClient);
     
      getAllorgNationals(): Observable<NacionalityOrg[]> {
        return this.http.get<NacionalityOrg[]>(`${baseUrl}/nacionalidad-organizaciones`).pipe(
          tap(resp => console.log('nacionalidad-organizaciones aqui:', resp))
        );
      }
    
    /*
      getTipePerosnsById(id: number): Observable<NacionalityOrg> {
    
        return this.http.get<NacionalityOrg>(`${baseUrl}/nacionalidad-organizaciones/${id}`)
          .pipe(
            tap((typePerson) => {
              console.log(`Tipo de persona por id   ${typePerson}`);
            }
            ));
      }
      */
}
