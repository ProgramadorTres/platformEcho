import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { moduleDetaill } from '@shared/interfaces/info-detaill';
import { map, of } from 'rxjs';
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
import { IProyectosContrato } from 'src/app/projects-contracts/interfaces/project-contract-create.interface';
import { ProjectsPaymentsService } from 'src/app/projects-payments/services/projects-payments.service';
import { IPayment } from 'src/app/projects-payments/interfaces/project-payments.interface';
import { ProcurementMethodService } from 'src/app/procurement-method/services/procurement-method.service';
import { ExpenseCategoriesService } from 'src/app/expense-categories/services/expense-categories.service';


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
  private paymentsService = inject(ProjectsPaymentsService);
  private procureMethodService = inject(ProcurementMethodService);
  private expenseCategories = inject(ExpenseCategoriesService);

  infoContractMod: moduleDetaill = {
    title: 'Nuevo Contrato',
    subtitle: 'Panel de registro de contratos y desembolsos',
    modulo_name: 'Módulo de Gestión'
  }

  wasSaved = signal(false);
  isError = signal(false);
  saveMessage = signal('');


  desembolsoSaved = signal(false);
  desembolsoError = signal(false);
  desembolsoMessage = signal('');

  contractorInput = input.required<Contrato>();
  projectOrganizationId = toSignal(this.activatedRoute.params.pipe(map(params => params['id'])));

  projectsResource = rxResource({
    loader: () => this.projectsService.getAllCProjectListas()
  });

  responsableMinutaResource = rxResource({
    loader: () => this.coordinatorService.getAllCordinatorsList()
  });

  pidResource = rxResource({
    loader: () => this.pidService.getAllPidsList()
  });

  procureMethodSource = rxResource({
    loader: () => this.procureMethodService.getProcurementMethodList()
  });

  contractTypeResource = rxResource({
    loader: () => this.contractTypeService.getAllContractTypesList()
  });

  contractResource = rxResource({
    loader: () => this.contractpeService.getAllContratistasList()
  });

  expenseCategoriesResource = rxResource({
    loader: () => this.expenseCategories.getExpenseCategoriesList()
  });

  // ── Resource de desembolsos — se recarga tras cada guardado ──
  paysResource = rxResource<IPayment[], string | number | undefined>({
    request: () => this.projectOrganizationId(),
    loader: ({ request: id }) => {
      if (id === 'new' || id === undefined || id === null) return of([]);
      return this.paymentsService.getPaymentsByPtojectContract(Number(id));
    }
  });

  // ── Subformulario independiente de desembolsos ───────────────
  desembolsoForm = this.fb.group({
    numero_desembolso: [null as number | null, [Validators.required, Validators.min(1)]],
    fecha_estimada_pago: [null as string | null, Validators.required],
    valor: [null as number | null, [Validators.required, Validators.min(0)]],
    observaciones: ['']
  });

  contractForm = this.fb.group({
    id_proyecto_contrat: [null],
    contrato_anulado: [false],
    no_tiene_poliza: [false],
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
      cedula_nit: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }]
    }),
    proyecto: this.fb.group({
      id_proyecto: [null, Validators.required],
      proyecto: [{ value: '', disabled: true }]
    }),

    metodoAdquisicion: this.fb.group({
      ID: [null, Validators.required],
      metodo_adquisicion: [{ value: '', disabled: true }]
    }),

    categoriasGasto: this.fb.group({
      id_categoria_gasto: [null, Validators.required],
      categoria_gasto: [{ value: '', disabled: true }]
    }),

    numero_contrato: ['', [Validators.required, Validators.maxLength(255)]],
    ARL: ['', Validators.maxLength(255)],
    causa_term_ant: ['', Validators.maxLength(255)],
    descripc_supervisor: ['', [Validators.maxLength(255)]],
    codigo_rubro: ['', Validators.maxLength(23)],
    objeto: ['', [Validators.maxLength(55000), Validators.minLength(10)]],
    actividades_funciones: ['', [Validators.maxLength(55000), Validators.minLength(10)]],
    desembolsos: ['', Validators.maxLength(255)],
    no_radicado_adquisiciones: [null, Validators.pattern("^[0-9]*$")],
    valor: [null, [Validators.required, Validators.min(0)]],
    valor_contrapartida: [null, Validators.min(0)],
    gastos_logisticos: [null, Validators.min(0)],
    recursos_liberados: [null, Validators.min(0)],
    gastos_log_liberados: [null, Validators.min(0)],
    Riesgo: [0, [Validators.min(0), Validators.max(5)]],
    fecha_liquid_term_ant: [null],
    fecha_aprobacion_poliza: [null],
    fecha_actualización: [null],
    fecha_sireci: [null],
    fecha_recordatorio: [null],
    fecha_suscripcion: [null, Validators.required],
    fecha_inicio: [null, Validators.required],
    fecha_terminacion: [null, Validators.required],


    //////
  
  });

  ngOnInit(): void { }

  constructor() {
    effect(() => {
      console.log('Status:', this.expenseCategoriesResource.status());
      console.log('Valor actual:', this.expenseCategoriesResource.value());

      const proyectos = this.projectsResource.value();
      const responsables = this.responsableMinutaResource.value();
      const pids = this.pidResource.value();
      const tiposContrato = this.contractTypeResource.value();
      const contratistas = this.contractResource.value();
      const metodosAdqs = this.procureMethodSource.value();
      const expenseCategoriess = this.expenseCategoriesResource.value();



      //al guardar recargar
      const todosListos = responsables && tiposContrato && contratistas && metodosAdqs && pids && proyectos && expenseCategoriess; //&& pids   proyectos &&  && expenseCategoriess
      const isEdit = this.projectOrganizationId() !== 'new';

      if (todosListos && isEdit) {
        const contrato = this.contractorInput();

        console.log('pid del contrato:', contrato.pid);
        console.log('pids disponibles:', pids?.slice(0, 3)); // primeros 3

        console.log('Pid mayuscula:', (contrato as any).Pid);
        console.log('PID mayuscula:', (contrato as any).PID);

        //console.log('keys del contrato:', Object.keys(contrato as any));
        //console.log('contrato completo:', contrato);
        //console.log('categoriasGasto:', (contrato as any).categoriasGasto);

        this.contractForm.patchValue({
          ...contrato as any,
          fecha_suscripcion: this.toDateInput(contrato.fecha_suscripcion),
          fecha_inicio: this.toDateInput(contrato.fecha_inicio),
          fecha_terminacion: this.toDateInput(contrato.fecha_terminacion),
          fecha_liquid_term_ant: this.toDateInput(contrato.fecha_liquid_term_ant),
          fecha_aprobacion_poliza: this.toDateInput(contrato.fecha_aprobacion_poliza),
          fecha_sireci: this.toDateInput(contrato.fecha_sireci),
          fecha_recordatorio: this.toDateInput(contrato.fecha_recordatorio),
          fecha_actualización: this.toDateInput(contrato.fecha_actualización),
          tipoContrato: { ID: contrato.tipoContrato?.ID ?? null },
          contratista: {
            id_contratista: contrato.contratista?.id_contratista ?? null,
            cedula_nit: contrato.contratista?.cedula_nit ?? '',
            email: contrato.contratista?.email ?? ''
          },
          responsableDigitacion: { id_responsable: contrato.responsableDigitacion?.id_responsable ?? null },
          responsableMinuta: { id_responsable: contrato.responsableMinuta?.id_responsable ?? null },
          Pid: { id_PID: (contrato as any).Pid?.id_PID ?? null },
          proyecto: {
            id_proyecto: contrato.proyecto?.id_proyecto ?? null,
            proyecto: contrato.proyecto?.proyecto ?? ''
          },

          //here
          metodoAdquisicion: {
            ID: contrato.metodosAdquisicion?.ID ?? null
          },

          categoriasGasto: {
            id_categoria_gasto: contrato.categoriasGasto?.id_categoria_gasto,
            categoria_gasto: contrato.categoriasGasto?.categoria_gasto ?? null
          }

        });
      }
    });
  }

  private toDateInput(date: Date | null | undefined): string | null {
    if (!date) return null;
    return new Date(date).toISOString().substring(0, 10);
  }

  validarSoloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(String.fromCharCode(event.charCode))) event.preventDefault();
  }

  preventInvalidChars(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', '.', ','].includes(event.key)) event.preventDefault();
  }

  // ── Guarda un desembolso y recarga la tabla ──────────────────
  guardarDesembolso(): void {
    if (this.desembolsoForm.invalid) {
      this.desembolsoForm.markAllAsTouched();
      return;
    }

    const idContrato = this.projectOrganizationId();
    if (!idContrato || idContrato === 'new') {
      this.desembolsoError.set(true);
      this.desembolsoMessage.set('Primero guarda el contrato para agregar desembolsos');
      this.desembolsoSaved.set(true);
      setTimeout(() => this.desembolsoSaved.set(false), 4000);
      return;
    }

    const payload = {
      id_proyecto_contrato: Number(this.projectOrganizationId()),
      numero_desembolso: this.desembolsoForm.value.numero_desembolso ?? undefined,
      fecha_estimada_pago: this.desembolsoForm.value.fecha_estimada_pago
        ? new Date(this.desembolsoForm.value.fecha_estimada_pago)
        : undefined,
      valor: this.desembolsoForm.value.valor ?? undefined,
      observaciones: this.desembolsoForm.value.observaciones ?? undefined,
    } as Partial<IPayment>;

    this.paymentsService.createProjectContract(payload).subscribe({
      next: () => {
        this.desembolsoForm.reset();           // limpia el form
        this.paysResource.reload();            // recarga la tabla
        this.desembolsoError.set(false);
        this.desembolsoMessage.set('Desembolso guardado');
        this.desembolsoSaved.set(true);
        setTimeout(() => this.desembolsoSaved.set(false), 3000);
      },
      error: (err) => {
        const msg = err.error?.message;
        this.desembolsoError.set(true);
        this.desembolsoMessage.set(Array.isArray(msg) ? msg[0] : (msg || 'Error al guardar'));
        this.desembolsoSaved.set(true);
        setTimeout(() => this.desembolsoSaved.set(false), 4000);
      }
    });
  }

  onProjectContractSubmit() {
    if (this.contractForm.invalid) {
      this.contractForm.markAllAsTouched();
      return;
    }

    const formProjectContract = this.contractForm.getRawValue();
    const isNew = this.projectOrganizationId() === 'new';

    const { id_proyecto_contrat, tipoContrato, contratista, responsableDigitacion,
      responsableMinuta, Pid, proyecto, metodoAdquisicion, categoriasGasto, ...rest } = formProjectContract;

    const toISOString = (date: string | null): string | null =>
      date ? new Date(date).toISOString() : null;
    //console.log('Pid' ,{Pid})

    const payloadProjectContract = {
      ...rest,
      id_tipo_contrato: tipoContrato?.ID ?? null,
      id_contratista: contratista?.id_contratista ?? null,
      id_responsable_digitacion: responsableDigitacion?.id_responsable ?? null,
      id_responsable_minuta: responsableMinuta?.id_responsable ?? null,
      PID: Pid?.id_PID ?? null,
      id_proyecto: proyecto?.id_proyecto ?? null,
      fecha_suscripcion: toISOString(rest.fecha_suscripcion),
      fecha_inicio: toISOString(rest.fecha_inicio),
      fecha_terminacion: toISOString(rest.fecha_terminacion),
      metodo_adquisicion: metodoAdquisicion.ID,
      categoria_gasto: categoriasGasto.id_categoria_gasto,
    } as Partial<IProyectosContrato>;

    const ProjectContractAction$ = isNew
      ? this.projectsContractsService.createProjectContract(payloadProjectContract)
      : this.projectsContractsService.updateProjectContract(
        Number(this.projectOrganizationId()), payloadProjectContract
      );

    ProjectContractAction$.subscribe({
      next: (contrato) => {
        this.handleUIResponse(
          isNew ? 'Creado con éxito' : 'Actualizado con éxito',
          contrato.id_proyecto_contrat
        );
      },
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
    if (!error && id && this.projectOrganizationId() === 'new') {
      setTimeout(() => this.router.navigate(['/admin/contratos', id]), 5000);
    }
    setTimeout(() => this.wasSaved.set(false), 5000);
  }
}