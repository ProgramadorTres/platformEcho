import { Component, inject, input } from '@angular/core';
import { Organization } from '../../interfaces/organizations.interface';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from "../../../utils/pipes/capitalize.pipe";
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'organizations-table',
  imports: [CommonModule, CapitalizePipe, RouterLink],
  templateUrl: './organizations-table.html',
})
export class OrganizationsTable {
  organizations = input.required<Organization[]>();
  paginationService = inject(PaginationService);
  isHovered: any;
  product: any;
  private authService = inject(AuthService);
  public isAdmin = this.authService.isAdmin;
}
