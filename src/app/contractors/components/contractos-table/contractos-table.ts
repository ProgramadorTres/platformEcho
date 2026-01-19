import { Component, inject, input } from '@angular/core';
import { Contratista } from '../../interfaces/contratista.interface';//interfaces/contratista.interface
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'contractos-table',
  imports: [RouterLink],
  templateUrl: './contractos-table.html',
})
export class ContractosTable { 
  contractors = input.required<Contratista[]>();
  paginationService = inject(PaginationService);
  isHovered: any;
  product: any;

  private authService = inject(AuthService);
  public isAdmin = this.authService.isAdmin;
}
