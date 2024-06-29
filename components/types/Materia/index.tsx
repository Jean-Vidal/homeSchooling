export interface Materia {
  id: string;
  materia: string;
  tema: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  concluido: boolean;
}
