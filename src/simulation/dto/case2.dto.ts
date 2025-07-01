import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber, Matches } from "class-validator";
import { Type } from "class-transformer";

export class OpcionesAsociadasDto {
  @IsBoolean()
  esCorrecta: boolean;

  @IsOptional()
  @IsString()
  consecuencia?: string;
}

export class OpcionDto {
  @IsString()
  texto: string;

  @IsOptional()
  @IsString()
  reaccion?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpcionesAsociadasDto)
  OpcionesAsociadas: OpcionesAsociadasDto[];
}

export class RelatoDto {
  @IsString()
  pregunta: string;  // La pregunta que el estudiante realiza

  @IsString()
  texto: string;  // Respuesta / relato del interlocutor

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpcionDto)
  opciones: OpcionDto[];
}

export class InterraccionDto {
  @IsString()
  nombreNPC: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelatoDto)
  preguntas: RelatoDto[];
}

export class InformacionPacienteDto {
  @IsString()
  nombre: string;

  @IsNumber()
  edad: number;

  @IsString()
  diagnostico_previo: string;

  @IsArray()
  @IsString({ each: true })
  diagnostico_actual: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antecedentes_relevantes?: string[];
}

export class ContextoInicialDto {
  @IsString()
  descripcion: string;

  @ValidateNested()
  @Type(() => InformacionPacienteDto)
  informacion_paciente: InformacionPacienteDto;
}

export class CaseDto {
  @IsString()
  titulo: string;

  @IsString()
  @Matches(/(APS|Urgencia|Hospitalario)/)
  tipo_caso: string;

  @ValidateNested()
  @Type(() => ContextoInicialDto)
  contexto_inicial: ContextoInicialDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterraccionDto)
  interacciones: InterraccionDto[];

  /*
  @IsString()
  @IsOptional()
  informacion_final_caso?: string; no se usa esto 
  */
}
