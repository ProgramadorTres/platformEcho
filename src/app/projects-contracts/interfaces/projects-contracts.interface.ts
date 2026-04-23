export interface ProjectsContractsResponse {
    count: number;
    pages: number;
    contratos: Contrato[];
}

export interface Contrato {
    id_proyecto_contrat: number;
    numero_contrato: string;
    no_radicado_adquisiciones: null;
    objeto: null | string;
    actividades_funciones: null | string;
    fecha_suscripcion: Date;
    fecha_inicio: Date;
    fecha_terminacion: Date;
    contrato_anulado: boolean;
    fecha_liquid_term_ant: null;
    causa_term_ant: null;
    recursos_liberados: null;
    gastos_log_liberados: null;
    no_tiene_poliza: boolean;
    fecha_aprobacion_poliza: Date | null;
    valor: number;
    valor_contrapartida: null;
    gastos_logisticos: number | null;
    admin_patnat: boolean;
    descripc_supervisor: null;
    desembolsos: null | string;
    codigo_rubro: null;
    hipervinculo_contrato: null | string;
    hiperv_productos: null;
    hiperv_informes: null;
    hiperv_acta_liqu_term_ant: null;
    fecha_actualización: Date;
    fecha_sireci: null;
    ARL: null | string;
    Riesgo: number | null;
    fecha_recordatorio: null;
    version_row: VersionRow;
    proyecto: Proyecto;
    contratista: Contratista;
    crp: null;
    tipoContrato: TipoContrato;
    categoriasGasto: CategoriasGasto | null;
    metodosAdquisicion: MetodosAdquisicion | null;
    codigo_secop: null;
    tipoPolizaContraloria: TipoPolizaContraloria | null;
    supervisor: OrdenadorGasto | null;
    ordenadorGasto: OrdenadorGasto | null;
    responsableDigitacion: OrdenadorGasto | null;
    responsableMinuta: OrdenadorGasto | null;
    pid: Pid | null;
}

export interface Pid {
    id_PID: number;
    PID: string;
    fecha: Date | null;
    valor_MO: number | null;
    moneda_original: string | null;
    valor_COP: number | null;
    hypervinculo: string | null;
}

export interface CategoriasGasto {
    id_categoria_gasto: number;
    categoria_gasto: string;
    categoria_gasto_GCF: null;
}

export interface Contratista {
    id_contratista: number;
    tipo_persona: string;
    id_tipo_identificacion: number;
    cedula_nit: number;
    DV: number | null;
    otra_identificacion: null;
    nombre: string;
    telefono: null;
    direccion: null;
    municipio: null;
    email: string;
    grupo_Rh: null;
    profesion: null;
    cargo: null;
    contacto_emergencia: null;
    celular_contacto_emerg: null;
    parentesco: null;
    fecha_actualización: Date;
    version_row: VersionRow;
}

export interface VersionRow {
    type: Type;
    data: number[];
}

export enum Type {
    Buffer = "Buffer",
}

export interface MetodosAdquisicion {
    ID: number;
    metodo_adquisicion: string;
}

export interface OrdenadorGasto {
    id_responsable: number;
    responsable: string;
    cédula: number;
    celular: null | string;
    email: string;
    id_organizacion: number | null;
    area: string;
    extensión: null;
    fecha_actualización: Date;
    version_row: VersionRow;
}

export interface Proyecto {
    id_proyecto: number;
    proyecto: string;
    codigoSicof: null | string;
    ejecucionTecnica: boolean;
    unidadCoordTecnica: boolean;
    nombreProyecto: string;
    numeroConvernio: string;
    referenciaExterna: null | string;
}

export interface TipoContrato {
    ID: number;
    tipo_contrato: string;
    abr_tipo: string;
}

export interface TipoPolizaContraloria {
    num: number;
    tipo_póliza: string;
}
