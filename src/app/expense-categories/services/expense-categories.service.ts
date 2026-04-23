import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IExpenseCategory } from '../interfaces/expense-categories.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {

  private http = inject(HttpClient);

   getExpenseCategoriesList(): Observable<IExpenseCategory[]> {
      return this.http.get<IExpenseCategory[]>(`${baseUrl}/categorias-gastos/list`)
        .pipe(
        tap((expenseCategories) => {
            console.log(`org   ${expenseCategories}  `);
            // this.contratonCache.set(cont.id_proyecto_contrat, cont)
          }
        ));
    }

}
