import { Options } from './organizations-options';

export interface OrganizationOptions extends Options {
  nationality?: string;
  organizationType?: string;
  country?: string;
  
}

// Configuración dinámica para la UI
export const ORGANIZATION_FILTERS_CONFIG = [
  { key: 'nationality', label: 'Nacionalidad', jsonProp: 'nacionalidad_org' },
  { key: 'organizationType', label: 'Tipo de Organización', jsonProp: 'tipo_organización' },
  { key: 'country', label: 'País', jsonProp: 'país_organización' }
] as const;