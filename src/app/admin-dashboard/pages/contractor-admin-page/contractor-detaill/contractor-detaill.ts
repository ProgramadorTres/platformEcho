import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contratista } from 'src/app/contractors/interfaces/contratista.interface';
import { ContratistaService } from 'src/app/contractors/services/contratista.service';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";

@Component({
  selector: 'contractor-detaill',
  imports: [FormErrorLabel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './contractor-detaill.html',
})
export class ContractorDetaill implements OnInit {

  contractor = input.required<Contratista>();
  fbContractor = inject(FormBuilder);
  router = inject(Router);
  contractorService = inject(ContratistaService);
  wasSaved = signal(false);

  contractForm = this.fbContractor.group({
    tipoPersona: ['', Validators.required],
    tipoIdentificacion: [1, Validators.required],
    cedulaNit: [0, Validators.required],
    dv: [],
    otraIdentificacion: [''],
    nombre: ['', Validators.required],
    telefono: [''],
    direccion: [''],
    email: ['']


  });


  ngOnInit(): void {
    this.setFormValue(this.contractor());
  }


  setFormValue(formLike: Partial<Contratista>) {
    this.contractForm.reset(this.contractor() as any);


  }

}
