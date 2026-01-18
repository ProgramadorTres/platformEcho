export interface Organization {
    no_organizacion:           number;
    id_organización:           string;
    nombre_organización:       string;
    NIT:                       number;
    dígito_verificación_NIT:   number;
    nacionalidad_organización: string;
    identificación_otro:       null;
    id_tipo_organizacion:      number;
    tipo_relación:             string;
    temas_organización:        string;
    posibilidad_asociación:    string;
    posibilidad_asociación_sd: null;
    responsable_organización:  string;
    teléfono_organización:     null;
    "e-mail_organización":     null;
    web_operador:              null;
    Dirección:                 null;
    Ubicación:                 null;
    id_pais:                   number;
    calificacion_tecnica:      null;
    coment_calif_tecnica:      null;
    calificacion_admin:        null;
    coment_calif_admin:        null;
    fechaActualizacion:        Date;
    versionRow:                VersionRow;
    TiposOrganizacione:        TiposOrganizacione ;
    nacionalidadOrganizacione: NacionalidadOrganizacione;
    paisesOrganizacion:        PaisesOrganizacion;
}

export interface TiposOrganizacione {
    ID:                  number;
    tipo_organización:   string;
    tipo_org_breve:      string;
    id_pob_beneficiaria: null;
}

export interface NacionalidadOrganizacione {
    nacionalidad_org: string;
}

export interface PaisesOrganizacion {
    id_pais:           number;
    país_organización: string;
}

export interface VersionRow {
    type: string;
    data: number[];
}

export interface OrganizationsResponse {
  count: number;
  pages: number;
  organizaciones: Organization[]; // Este es el nombre clave
}