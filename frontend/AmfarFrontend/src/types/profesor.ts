export interface InstrumentoEspecialidadResponse {
  idInstrumento: number;
  nombreInstrumento: string;
}

export interface ProfesorResponse {
  idProfesor: number;
  idPersona: number;
  nombre: string;
  apellido: string;
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
  idsInstrumentos?: number[];
}

export interface AgregarEspecialidadRequest {
  idInstrumento: number;
}
