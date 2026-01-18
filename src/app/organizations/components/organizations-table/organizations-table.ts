import { Component, inject, input } from '@angular/core';
import { Organization } from '../../interfaces/organizations.interface';
import { PaginationService } from '@shared/components/pagination-component/pagination.service';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from "../../../utils/pipes/capitalize.pipe";

@Component({
  selector: 'organizations-table',
  imports: [ CommonModule,CapitalizePipe],
  templateUrl: './organizations-table.html',
})
export class OrganizationsTable {

    organizations = input.required<Organization[]>();
    paginationService = inject(PaginationService);
    isHovered: any;
    product: any;

 }
