// Tipos específicos para valores conocidos
export type TipoPersonaType = "Persona natural" | "Persona jurídica";
export type TipoIdentificacionType = "Cédula de ciudadanía" | "Cédula de extranjería" |  "NIT" | "Otro" | string;
/*
// Interface principal para la respuesta de la API
export interface ContratistasResponse {
   count:    number;
  pages:    number;
  total:number;
  contratistas: Contratista[];
}
*/
export interface ContratistasResponse {
  count: number;
  pages: number;
  contratistas: Contratista[]; // Este es el nombre clave
}

// Interface para cada contratista con tipos más específicos
export interface Contratista {

    id_contratista: number;
    tipo_persona: string;
    //tipo_identificacion: string;
      tipoIdentificacion: TipoIdentificacion;
    id_tipo_identificacion: number;
    cedula_nit: number | null | undefined;
    DV: number | null | undefined;
    otra_identificacion: string | null;
    nombre: string;
    telefono: string;
    direccion: string;
    municipio: string | null;
    email: string;
    grupo_Rh: string | null;
    profesion: string | null;
    cargo: string | null;
    contacto_emergencia: string | null;
    celular_contacto_emerg: string | null;
    parentesco: string | null;
    fecha_actualización: string;  // ISO string de fecha
    version_row: VersionRow | null;
}

export interface VersionRow {
  type: "Buffer";
  data: number[];
}

// Interface para tipoPersona
export interface TipoPersona {
  tipo_persona: TipoPersonaType;
}

// Interface para tipoIdentificacion
export interface TipoIdentificacion {
  Id: number;
  tipo_identificacion: TipoIdentificacionType;
}

// Si prefieres usar Date en lugar de string para fechas:
export interface ContratistaConFecha extends Omit<Contratista, 'fecha_actualización'> {
  fecha_actualización: Date;
}