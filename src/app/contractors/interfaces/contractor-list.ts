export interface ContractorList {
    id_contratista:      number;
    nombre:              string;
    cedula_nit:          number;
    tipo_identificacion: TipoIdentificacion;
    tipo_persona:        TipoPersona;
}

export enum TipoIdentificacion {
    CédulaDeCiudadanía = "Cédula de ciudadanía",
    CédulaDeExtranjería = "Cédula de extranjería",
    Nit = "NIT",
    Otro = "Otro",
}

export enum TipoPersona {
    PersonaJurídica = "Persona jurídica",
    PersonaNatural = "Persona natural",
}
