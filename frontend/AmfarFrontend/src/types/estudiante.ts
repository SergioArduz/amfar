export interface Tutor {
  idTutor: number;
  nombre: string;
  apellido: string;
  parentesco: string;
}

export interface Estudiante {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  tieneInstrumento: boolean;
  tutores: Tutor[];
}