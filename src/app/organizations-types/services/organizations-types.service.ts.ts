import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrganizationTypes } from '../interfaces/organization-tipes.interface';
const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class OrganizationsTypesServiceTs {

      private http = inject(HttpClient);
     
      getAllorgNationals(): Observable<OrganizationTypes[]> {
        return this.http.get<OrganizationTypes[]>(`${baseUrl}/tipos-organizaciones`).pipe(
          tap(resp => console.log('tipos-organizaciones aqui:', resp))
        );
      }
    

}
