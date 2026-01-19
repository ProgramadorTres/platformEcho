import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Contratista } from 'src/app/contractors/interfaces/contratista.interface';
import { ContratistaService } from 'src/app/contractors/services/contratista.service';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TypeIdentificationsService } from 'src/app/type-identifications/services/type-identifications.service';
import { CommonModule } from '@angular/common';
import { PersonTypesService } from 'src/app/person-types/services/person-types.service';

import { map } from 'rxjs';

@Component({
  selector: 'contractor-detaill',
  imports: [FormErrorLabel, ReactiveFormsModule, FormErrorLabel, NgSelectModule, CommonModule],
  templateUrl: './contractor-detaill.html',
})
export class ContractorDetaill implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private contractorService = inject(ContratistaService);
  private typeIdentificationsService = inject(TypeIdentificationsService);
  private typesPersonService = inject(PersonTypesService);

  contractor = input.required<Contratista>();
  wasSaved = signal(false);
  isError = signal(false);
  saveMessage = signal('');

  contractorId = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']))
  );

  // --- RECURSOS (Nombres actualizados) ---
  typesDocResource = rxResource({
    loader: () => this.typeIdentificationsService.getAllTiposDocumentos()
  });

  personTypesResource = rxResource({
    loader: () => this.typesPersonService.getAllTipePerons()
  });

  contractForm = this.fb.group({
    tipoPersona: [null as string | null, Validators.required],
    tipoIdentificacion: [null as number | null, Validators.required],
    cedula_nit: [null as number | null, Validators.required],
    dv: [null as number | null],
    otraIdentificacion: [''],
    nombre: ['', [Validators.required, Validators.minLength(10)]],
    telefono: [''],
    direccion: [''],
    email: ['']
  });

  ngOnInit(): void {
    if (this.contractorId() !== 'new') {
      this.setFormValue(this.contractor());
    }
  }

  setFormValue(data: Partial<Contratista>) {
    this.contractForm.patchValue({
      ...data,
      tipoIdentificacion: data.tipoIdentificacion?.Id ?? null,
      tipoPersona: data.tipo_persona ?? null,
      dv: data.DV
    });
  }

  ContractonSubmit() {
    if (this.contractForm.invalid) return this.contractForm.markAllAsTouched();

    const raw = this.contractForm.getRawValue();
    const body: any = {
      nombre: raw.nombre,
      tipo_persona: raw.tipoPersona,
      id_tipo_identificacion: Number(raw.tipoIdentificacion),
      cedula_nit: Number(raw.cedula_nit),
    };

    const optionalConfig = [
      { key: 'email', val: raw.email, min: 4 },
      { key: 'telefono', val: raw.telefono, min: 6 },
      { key: 'direccion', val: raw.direccion, min: 4 },
      { key: 'otra_identificacion', val: raw.otraIdentificacion, min: 1 }
    ];

    optionalConfig.forEach(({ key, val, min }) => {
      const trimmed = val?.trim();
      if (trimmed && trimmed.length >= min) body[key] = trimmed;
    });

    if (raw.dv !== null && raw.dv !== undefined) body.DV = Number(raw.dv);

    const isNew = this.contractorId() === 'new';
    const action$ = isNew
      ? this.contractorService.createContratista(body)
      : this.contractorService.updateContratista(this.contractor().id_contratista, body);

    action$.subscribe({
      next: (res) => this.handleUIResponse(isNew ? 'Creado con éxito' : 'Actualizado con éxito', res.id_contratista),
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
    if (!error && id && this.contractorId() === 'new') this.router.navigate(['/admin/contratistas', id]);
    setTimeout(() => this.wasSaved.set(false), error ? 5000 : 3000);
  }

}
