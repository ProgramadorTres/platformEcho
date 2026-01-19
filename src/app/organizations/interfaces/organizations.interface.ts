export interface Organization {
    no_organizacion:           number;
    id_organización:           string;
    nombre_organización:       string | null;
    NIT:                       number | null;
    dígito_verificación_NIT:   number | null;
    nacionalidad_organización: string | null;
    identificación_otro:       string | null;
    id_tipo_organizacion:      number;
    tipo_relación:             string | null;
    temas_organización:        string | null;
    posibilidad_asociación:    string | null;
    posibilidad_asociación_sd: string | null;
    responsable_organización:  string | null;
    teléfono_organización:     string | null;
    "e-mail_organización":     string | null;
    web_operador:              string | null;
    Dirección:                 string | null;
    Ubicación:                 string | null;
    id_pais:                   number | null;
    calificacion_tecnica:      number | null;
    coment_calif_tecnica:      string | null;
    calificacion_admin:        number | null;
    coment_calif_admin:        string | null;
    fechaActualizacion:        Date | string | null;
    versionRow:                VersionRow;
    TiposOrganizacione:        TiposOrganizacione;
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