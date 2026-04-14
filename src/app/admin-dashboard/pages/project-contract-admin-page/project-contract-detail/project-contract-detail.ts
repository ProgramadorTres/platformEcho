import { Component, inject, input, OnInit, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { moduleDetaill } from '@shared/interfaces/info-detaill';
import { map } from 'rxjs';
import { Contrato } from 'src/app/projects-contracts/interfaces/projects-contracts.interface';
import { FormErrorLabel } from '@shared/components/form-error-label/form-error-label';
import { ProjectsContractsServiceTs } from 'src/app/projects-contracts/services/projects-contracts.service.ts';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Coordinator } from 'src/app/coordinators/services/coordinator.service';
import { Pid } from 'src/app/pids/services/pid.service';
import { ContractType } from 'src/app/contract-type/services/contract-type.service';
import { ContratistaService } from 'src/app/contractors/services/contratista.service';
import { BtnHome } from "@dashboard/components/btn-home/btn-home";

@Component({
  selector: 'project-contract-detail',
  imports: [ReactiveFormsModule, FormErrorLabel, NgSelectModule, CommonModule, BtnHome],
  templateUrl: './project-contract-detail.html',
  styleUrls: ['./project-contract-detail.css']
})
export class ProjectContractDetail implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private projectsService = inject(ProjectService);
  private coordinatorService = inject(Coordinator);
  private pidService = inject(Pid);
  private contractTypeService = inject(ContractType);
  private contractpeService = inject(ContratistaService);
  private projectsContractsService = inject(ProjectsContractsServiceTs);

  infoContractMod: moduleDetaill = {
    title: 'Nuevo Contrato',
    subtitle: 'Panel de registro de contratos y desembolsos',
    modulo_name: 'Módulo de Gestión'
  }

  wasSaved = signal(false);
  isError = signal(false);
  saveMessage = signal('');

  contractorInput = input.required<Contrato>();
  projectOrganizationId = toSignal(this.activatedRoute.params.pipe(map(params => params['id'])));

  projectsResource = rxResource({
    loader: () => this.projectsService.getAllContratistas()
  });

  responsableMinutaResource = rxResource({
    loader: () => this.coordinatorService.getAllCordinatorsList()
  });


  pidResource = rxResource({
    loader: () => this.pidService.getAllPidsList()
  });

  contractTypeResource = rxResource({
    loader: () => this.contractTypeService.getAllContractTypesList()
  });

  contractResource = rxResource({
    loader: () => this.contractpeService.getAllContratistasList()
  });

  contractForm = this.fb.group({
    // Identificador y lógicos
    id_proyecto_contrat: [null],
    contrato_anulado: [false],
    no_tiene_poliza: [false],
    //admin_patnat: [false],

    // Relaciones Anidadas (Coincide con tus formGroupName en el HTML)
    responsableDigitacion: this.fb.group({
      id_responsable: [null, Validators.required]
    }),
    responsableMinuta: this.fb.group({
      id_responsable: [null, Validators.required]
    }),
    Pid: this.fb.group({
      id_PID: [null, Validators.required]
    }),
    tipoContrato: this.fb.group({
      ID: [null, Validators.required]
    }),
    contratista: this.fb.group({
      id_contratista: [null, Validators.required],
      cedula_nit: [{ value: '', disabled: true }], // nvarchar 255 indirecto
      email: [{ value: '', disabled: true }]
    }),

    // Campos de Texto (Validando según longitudes del Entity)
    numero_contrato: ['', [Validators.required, Validators.maxLength(255)]],
    ARL: ['', Validators.maxLength(255)],
    causa_term_ant: ['', Validators.maxLength(255)],
    descripc_supervisor: ['',  [Validators.maxLength(255)]],  //, 
    codigo_rubro: ['', Validators.maxLength(23)],

    // Textos Largos (nvarchar max / 55000)
    objeto: ['', [Validators.maxLength(55000), Validators.minLength(10)]],
    //actividades_funciones: ['', Validators.maxLength(55000)], //Validators.min(10),
    actividades_funciones: ['', [Validators.maxLength(55000), Validators.minLength(10)]],
    desembolsos: ['', Validators.maxLength(255)], // En entity es 255

    // Campos Numéricos y Dinero
    no_radicado_adquisiciones: [null, Validators.pattern("^[0-9]*$")],
    valor: [null, [Validators.required, Validators.min(0)]],
    valor_contrapartida: [null, Validators.min(0)],
    gastos_logisticos: [null, Validators.min(0)],
    recursos_liberados: [null, Validators.min(0)],
    gastos_log_liberados: [null, Validators.min(0)],

    // Riesgo (tinyint en DB)
    Riesgo: [0, [Validators.min(0), Validators.max(5)]],

    // Fechas
    fecha_suscripcion: [null],
    fecha_inicio: [null],
    fecha_terminacion: [null],
    fecha_liquid_term_ant: [null],
    fecha_aprobacion_poliza: [null],
    fecha_actualización: [null],
    fecha_sireci: [null],
    fecha_recordatorio: [null]
  });

  ngOnInit(): void {
    if (this.projectOrganizationId() !== 'new') {
      this.contractForm.patchValue(this.contractorInput() as any);
    }
    //console.log("this.projectOrganizationId() ", this.projectOrganizationId());
    //console.log("que ", this.contractForm);
  }


  validarSoloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // 2. Bloquea teclas específicas que el tipo "number" permite por defecto
  preventInvalidChars(event: KeyboardEvent) {
    // Bloqueamos 'e' (exponencial), puntos, comas y signos
    if (['e', 'E', '+', '-', '.', ','].includes(event.key)) {
      event.preventDefault();
    }
  }

  onProjectContractSubmit() {

    if (this.contractForm.invalid) {
      this.contractForm.markAllAsTouched();
      return;
    }

    const formProjectContract = this.contractForm.getRawValue();
    const isNew = this.projectOrganizationId() === 'new';
    

    
  }

  private handleUIResponse(message: string, id: number | null, error = false) {
    this.isError.set(error);
    this.saveMessage.set(message);
    this.wasSaved.set(true);

    if (!error && id && this.projectOrganizationId() === 'new') {
      this.router.navigate(['/admin/projects-contracts', id]); // Ajusta la ruta a tu necesidad
    }

    setTimeout(() => this.wasSaved.set(false), error ? 5000 : 3000);
  }


}
