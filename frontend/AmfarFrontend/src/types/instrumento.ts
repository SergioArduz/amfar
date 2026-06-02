export interface InstrumentoResponse {
  idInstrumento: number;
  nombre: string;
  tipo: string;
  stockTotal: number;
  stockDisponible: number;
  estado: string;
  createdAt: string;
}

export interface CrearInstrumentoRequest {
  nombre: string;
  tipo: string;
  stockTotal: number;
}

export interface ActualizarInstrumentoRequest {
  nombre?: string;
  tipo?: string;
  stockTotal?: number;
}

export interface CambiarEstadoInstrumentoRequest {
  estado: string;
}

export interface DisponibilidadResponse {
  idInstrumento: number;
  nombre: string;
  disponible: boolean;
  stockDisponible: number;
}
