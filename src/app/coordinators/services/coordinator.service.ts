import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoordinatorList } from '../interfaces/coordinators-lists';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Coordinator {

   private http = inject(HttpClient);
 
   getAllCordinatorsList(): Observable<CoordinatorList[]> {
     return this.http.get<CoordinatorList[]>(`${baseUrl}/coordinadores/list`).pipe(
     //  tap(resp => console.log('proyectos/list recibidos:', resp))
     );
   }

}
