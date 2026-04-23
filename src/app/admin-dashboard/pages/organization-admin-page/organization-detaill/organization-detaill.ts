import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormErrorLabel } from '@shared/components/form-error-label/form-error-label';
import { map } from 'rxjs';
import { CountriesOrganizationsService } from 'src/app/countries-organizations/services/countries-organizations.service';
import { NacionalityOrganizationsServiceTs } from 'src/app/nacionality-organizations/services/nacionality-organizations.service.ts';
import { OrganizationsTypesServiceTs } from 'src/app/organizations-types/services/organizations-types.service.ts';
import { NacionalidadOrganizacione, Organization, PaisesOrganizacion, TiposOrganizacione, VersionRow } from 'src/app/organizations/interfaces/organizations.interface';
import { OrganizationService } from 'src/app/organizations/services/organizations';
import { BtnHome } from "@dashboard/components/btn-home/btn-home";

@Component({
  selector: 'organization-detaill',
  imports: [FormErrorLabel, ReactiveFormsModule, NgSelectModule, CommonModule, BtnHome],
  templateUrl: './organization-detaill.html',
  styleUrls: ['./organization-detaill.css'] 
})
export class OrganizationDetaill implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private organizationService = inject(OrganizationService);
  
  private orgNationalities = inject(NacionalityOrganizationsServiceTs);
  private orgCountries = inject(CountriesOrganizationsService);
  private orgTypes = inject(OrganizationsTypesServiceTs);

  organization = input.required<Organization>();
  wasSaved = signal(false);
  isError = signal(false);
  saveMessage = signal('');

  organizationId = toSignal(this.activatedRoute.params.pipe(map(params => params['id'])));
  
  orgTypesResource = rxResource({ loader: () => this.orgTypes.getAllorgNationals() });
  orgNationalitiesResource = rxResource({ loader: () => this.orgNationalities.getAllorgNationals() });
  orgCountriesResource = rxResource({ loader: () => this.orgCountries.getAllorgCountries() });

  // fb: Sin validaciones de longitud, solo requeridos básicos para la DB
  organizationForm = this.fb.group({
    id_organización: ['', [Validators.required]],
    id_tipo_organizacion: [null as number | null, [Validators.required]],
    nombre_organización: ['', [Validators.required]],
    NIT: [null as number | null],
    dígito_verificación_NIT: [null as number | null],
    nacionalidad_organización: [null as string | null],
    identificación_otro: [''],
    tipo_relación: [''],
    temas_organización: [''],
    posibilidad_asociación: [''],
    posibilidad_asociación_sd: [''],
    responsable_organización: [''],
    teléfono_organización: [''],
    "e-mail_organización": [''],
    web_operador: [''],
    Dirección: [''],
    Ubicación: [''],
    id_pais: [null as number | null],
    calificacion_tecnica: [null as number | null],
    coment_calif_tecnica: [''],
    calificacion_admin: [null as number | null],
    coment_calif_admin: ['']
  });

  ngOnInit(): void {
    if (this.organizationId() !== 'new') {
      this.organizationForm.patchValue(this.organization() as any);
    }
  }

  OrganizationOnSubmit() {
    if (this.organizationForm.invalid) return this.organizationForm.markAllAsTouched();

    const raw = this.organizationForm.getRawValue();
    const isNew = this.organizationId() === 'new';

    // Construcción directa del body sin el bloque optionalConfig
    const body: any = {
      ...raw,
      id_tipo_organizacion: Number(raw.id_tipo_organizacion),
      id_pais: raw.id_pais ? Number(raw.id_pais) : null,
      NIT: raw.NIT ? Number(raw.NIT) : null,
      dígito_verificación_NIT: raw.dígito_verificación_NIT !== null ? Number(raw.dígito_verificación_NIT) : null,
      calificacion_tecnica: raw.calificacion_tecnica !== null ? Number(raw.calificacion_tecnica) : null,
      calificacion_admin: raw.calificacion_admin !== null ? Number(raw.calificacion_admin) : null,
    };

    delete body.fecha_actualización;
    delete body.fechaActualizacion;
    delete body.versionRow;
    
    const action$ = isNew
      ? this.organizationService.createOrganization(body) 
      : this.organizationService.updateOrganization(this.organization().no_organizacion,body);

    action$.subscribe({
      next: (res: any) => 
        this.handleUIResponse(isNew ? 'Creado con éxito' : 'Actualizado con éxito', res.no_organizacion),
      error: (err) => {
        const msg = err.error?.message;
        this.handleUIResponse(Array.isArray(msg) ? msg[0] : (msg || 'Error'), null, true);
      }
    });
  }

  private handleUIResponse(message: string, id: number | null, error = false) {
    this.isError.set(error);
    this.saveMessage.set(message);
    this.wasSaved.set(true);
    if (!error && id && this.organizationId() === 'new') this.router.navigate(['/admin/organizations', id]);
    setTimeout(() => this.wasSaved.set(false), error ? 5000 : 3000);
  }
}
