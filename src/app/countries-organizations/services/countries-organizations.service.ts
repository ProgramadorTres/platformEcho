import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Countries } from '../interfaces/countries-organizations.interface';
import { Observable, tap } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CountriesOrganizationsService {

  private http = inject(HttpClient);

  getAllorgCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(`${baseUrl}/paises-organizaciones`).pipe(
      tap(resp => console.log('paises-organizaciones aqui:', resp))
    );
  }

}
