import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PIDList } from '../interfaces/pids-list';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Pid {

  private http = inject(HttpClient);

  getAllPidsList(): Observable<PIDList[]> {
    return this.http.get<PIDList[]>(`${baseUrl}/pids/list`).pipe(
      //  tap(resp => console.log('proyectos/list recibidos:', resp))
    );
  }

}
