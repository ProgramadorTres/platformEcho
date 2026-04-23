import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProcurementMethod } from '../interfaces/procurement-method.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProcurementMethodService {


  private http = inject(HttpClient);
  // private projectsPaymentsCache = new Map<string, ProjectsContractsResponse>();
  // private paymentCache = new Map<number, Contrato>();

  getProcurementMethodList(): Observable<IProcurementMethod[]> {
    return this.http.get<IProcurementMethod[]>(`${baseUrl}/metodos-adquisiciones/list`)
      .pipe(
      tap((procuMet) => {
          //console.log(`org   ${procuMet}  `);
          // this.contratonCache.set(cont.id_proyecto_contrat, cont)
        }
      ));
  }

}
