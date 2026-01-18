export interface OrganizationTypes {
    ID:                     number;
    tipo_organización:      string;
    tipo_org_breve:         string;
    id_pob_beneficiaria:    number;
    poblacionesBenefciaria: PoblacionesBenefciaria;
}

export interface PoblacionesBenefciaria {
    id_pob_beneficiaria: number;
    pob_beneficiaria:    string;
}
