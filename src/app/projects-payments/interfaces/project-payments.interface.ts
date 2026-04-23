export interface IPayment {
    id_contrato_desembolso:     number;
    numero_desembolso:          number;
    fecha_estimada_pago:        Date;
    valor:                      number;
    id_informe_programado:      null;
    id_informe_entregado:       null;
    mes_salud_pension:          null;
    fecha_radicacion_documen:   null;
    fecha_entrega_contabilidad: null;
    fecha_pago:                 null;
    fecha_actualización:        Date;
    observaciones:              string;
    version_row:                VersionRow;
    proyectoContrato:           ProyectoContrato;
}

export interface ProyectoContrato {
    id_proyecto_contrat:       number;
    numero_contrato:           string;
    no_radicado_adquisiciones: null;
    objeto:                    string;
    actividades_funciones:     string;
    fecha_suscripcion:         Date;
    fecha_inicio:              Date;
    fecha_terminacion:         Date;
    contrato_anulado:          boolean;
    fecha_liquid_term_ant:     null;
    causa_term_ant:            string;
    recursos_liberados:        null;
    gastos_log_liberados:      null;
    no_tiene_poliza:           boolean;
    fecha_aprobacion_poliza:   null;
    valor:                     number;
    valor_contrapartida:       null;
    gastos_logisticos:         null;
    admin_patnat:              boolean;
    descripc_supervisor:       string;
    desembolsos:               string;
    codigo_rubro:              string;
    hipervinculo_contrato:     null;
    hiperv_productos:          null;
    hiperv_informes:           null;
    hiperv_acta_liqu_term_ant: null;
    fecha_actualización:       null;
    fecha_sireci:              null;
    ARL:                       string;
    Riesgo:                    number;
    fecha_recordatorio:        null;
    version_row:               VersionRow;
}

export interface VersionRow {
    type: string;
    data: number[];
}
