import { Contrato, Type } from "../interfaces/projects-contracts.interface";

export const emptyContract: Contrato = {
  id_proyecto_contrat: 0,
  numero_contrato: '',
  no_radicado_adquisiciones: null,
  objeto: null,
  actividades_funciones: null,
  fecha_suscripcion: new Date(),
  fecha_inicio: new Date(),
  fecha_terminacion: new Date(),
  contrato_anulado: false,
  fecha_liquid_term_ant: null,
  causa_term_ant: null,
  recursos_liberados: null,
  gastos_log_liberados: null,
  no_tiene_poliza: false,
  fecha_aprobacion_poliza: null,
  valor: 0,
  valor_contrapartida: null,
  gastos_logisticos: null,
  admin_patnat: false,
  descripc_supervisor: null,
  desembolsos: null,
  codigo_rubro: null,
  hipervinculo_contrato: null,
  hiperv_productos: null,
  hiperv_informes: null,
  hiperv_acta_liqu_term_ant: null,
  fecha_actualización: new Date(),
  fecha_sireci: null,
  ARL: null,
  Riesgo: null,
  fecha_recordatorio: null,
  
  // Objetos anidados obligatorios
  version_row: {
    type: Type.Buffer,
    data: []
  },
  proyecto: {
    id_proyecto: 0,
    proyecto: '',
    codigoSicof: null,
    ejecucionTecnica: false,
    unidadCoordTecnica: false,
    nombreProyecto: '',
    numeroConvernio: '',
    referenciaExterna: null
  },
  contratista: {
    id_contratista: 0,
    tipo_persona: '',
    id_tipo_identificacion: 0,
    cedula_nit: 0,
    DV: null,
    otra_identificacion: null,
    nombre: '',
    telefono: null,
    direccion: null,
    municipio: null,
    email: '',
    grupo_Rh: null,
    profesion: null,
    cargo: null,
    contacto_emergencia: null,
    celular_contacto_emerg: null,
    parentesco: null,
    fecha_actualización: new Date(),
    version_row: {
      type: Type.Buffer,
      data: []
    }
  },
  tipoContrato: {
    ID: 0,
    tipo_contrato: '',
    abr_tipo: ''
  },

  // Campos que pueden ser nulos (opcionales según tu interfaz)
  crp: null,
  categoriasGasto: null,
  metodosAdquisicion: null,
  codigo_secop: null,
  tipoPolizaContraloria: null,
  supervisor: null,
  ordenadorGasto: null,
  responsableDigitacion: null,
  responsableMinuta: null
};