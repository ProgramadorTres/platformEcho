export interface Contratista {
  id_contratista: number ;
  tipo_persona: string;
  tipoIdentificacion: TipoIdentificacion;
  id_tipo_identificacion: number;
  cedula_nit: number |null | undefined;
  DV: number | null | undefined;
  otra_identificacion: string | null;
  nombre: string;
  telefono: string;
  direccion: string;
  municipio: string | null;
  email: string ;
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
  type: "Buffer";  // "Buffer"
  data: number[]; // Array de bytes
}



export type TipoPersonaType = "Persona natural" | "Persona jurídica";
export type TipoIdentificacionType = "Cédula de ciudadanía" | "NIT" | string;
export interface TipoIdentificacion {
  Id: number;
  tipo_identificacion: TipoIdentificacionType;
}