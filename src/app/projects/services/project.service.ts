import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectList } from '../interfaces/projects-list.ts';


const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  getAllContratistas(): Observable<ProjectList[]> {
    return this.http.get<ProjectList[]>(`${baseUrl}/proyectos/list`).pipe(
    //  tap(resp => console.log('proyectos/list recibidos:', resp))
    );
  }

}
