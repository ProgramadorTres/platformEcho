export interface PIDList {
    id_PID:          number;
    PID:             string;
    fecha:           Date | null;
    valor_MO:        number | null;
    moneda_original: string;
    valor_COP:       number;
    hypervinculo:    null;
    version_row:     VersionRow;
    proyecto:        Proyecto;
}

export interface Proyecto {
    id_proyecto:        number;
    proyecto:           string;
    codigoSicof:        string;
    ejecucionTecnica:   boolean;
    unidadCoordTecnica: boolean;
    nombreProyecto:     string;
    numeroConvernio:    null | string;
    referenciaExterna:  null | string;
}

export interface VersionRow {
    type: string;
    data: number[];
}
