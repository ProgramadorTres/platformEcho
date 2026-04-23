export interface IProyectosContrato {
  // --- OBLIGATORIOS ---
  id_proyecto: number | null;
  numero_contrato: string;
  id_tipo_contrato: number | null;
  id_contratista: number | null;
  fecha_suscripcion: string ;
  fecha_inicio: string ;
  fecha_terminacion: string ;
  valor: number | null;
  contrato_anulado: boolean;
  no_tiene_poliza: boolean;
  

  // --- OPCIONALES ---
  admin_patnat?: boolean | null;
  no_radicado_adquisiciones?: number | null;
  objeto?: string | null;
  actividades_funciones?: string | null;
  valor_contrapartida?: number | null;
  gastos_logisticos?: number | null;
  descripc_supervisor?: string | null;
  codigo_rubro?: string | null;
  hipervinculo_contrato?: string | null;

  // Relaciones (IDs)
  id_crp?: number | null;
  categoria_gasto?: number | null;
  metodo_adquisicion?: number | null;
  codigo_secop?: string | null;
  id_supervisor?: number | null;
  id_ordenador_gasto?: number | null;
  id_responsable_minuta?: number | null;
  id_responsable_digitacion?: number | null;
  ID_poliza_contraloria?: number | null;

  // Terminación anticipada
  fecha_liquid_term_ant?: string | null;
  causa_term_ant?: string | null;
  recursos_liberados?: number | null;
  gastos_log_liberados?: number | null;

  // Póliza
  fecha_aprobacion_poliza?: string | null;

  // Otros
  desembolsos?: string | null;
  hiperv_productos?: string | null;
  hiperv_informes?: string | null;
  hiperv_acta_liqu_term_ant?: string | null;
  fecha_actualización?: string | null;
  fecha_sireci?: string | null;
  ARL?: string | null;
  Riesgo?: number | null;
  fecha_recordatorio?: string | null;
  PID?: number | null;
  nivel_pid?: number | null;
}