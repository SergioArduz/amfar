export interface InstrumentoEspecialidadResponse {
  idInstrumento: number;
  nombreInstrumento: string;
}

export interface ProfesorResponse {
  idProfesor: number;
  idPersona: number;
  nombreCompleto: string;
  telefono: string;
  estado: string;
  fechaRegistro: string;
  especialidades: InstrumentoEspecialidadResponse[];
}

export interface CrearProfesorRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  idsInstrumentos: number[];
}

export interface ActualizarProfesorRequest {
  nombre?: string;
  apellido?: string;
  telefono?: string;
}

export interface AgregarEspecialidadRequest {
  idInstrumento: number;
}
