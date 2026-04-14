import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractTypeList } from '../interfaces/contract-type-list';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ContractType {

  private http = inject(HttpClient);

  getAllContractTypesList(): Observable<ContractTypeList[]> {
    return this.http.get<ContractTypeList[]>(`${baseUrl}/tipos-contrato/list`).pipe(
    );
  }
}
