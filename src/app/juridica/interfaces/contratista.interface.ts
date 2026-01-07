export interface Contratista {
  id_contratista: number;
  tipo_persona: string;
  id_tipo_identificacion: number;
  cedula_nit: number;
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
  type: string;  // "Buffer"
  data: number[]; // Array de bytes
}
