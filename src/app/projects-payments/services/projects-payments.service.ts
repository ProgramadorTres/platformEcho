import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPayment } from '../interfaces/project-payments.interface';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectsPaymentsService {

  private http = inject(HttpClient);
  // private projectsPaymentsCache = new Map<string, ProjectsContractsResponse>();
  // private paymentCache = new Map<number, Contrato>();

  getPaymentsByPtojectContract(idProjectContract: number): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(`${baseUrl}/desembolsos/proyectos-desembolsos/${idProjectContract}`)
      .pipe(
        tap((pays) => {
          console.log(`org   ${pays}  `);
          // this.contratonCache.set(cont.id_proyecto_contrat, cont)
        }
        ));
  }


  createProjectContract(paymentLike: Partial<IPayment>): Observable<IPayment> {  //IProyectosContrato
    console.log("Crear desembolso ", paymentLike);
    return this.http.post<IPayment>(`${baseUrl}/desembolsos/`, paymentLike)
      .pipe(
      //tap((contratista) => this.updateOrganizationCache(contratista))
    );
  }


}


