import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber, Matches } from "class-validator";
import { Type } from "class-transformer";

export class OpcionDto {
  @IsString()
  texto: string;

  @IsString()
  respuestaAsociada: string;

  @IsBoolean()
  esCorrecta: boolean;

  @IsOptional()
  @IsString()
  consecuencia?: string;
}

export class PreguntaDto {
  @IsString()
  texto: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpcionDto)
  opciones: OpcionDto[];
}

export class InterraccionDto {
  @IsString()
  nombreNPC: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreguntaDto)
  preguntas: PreguntaDto[];


  
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
  @Matches(/(APS|Urgencia|Hospitario)/)
  tipo_caso: string;

  @ValidateNested()
  @Type(() => ContextoInicialDto)
  contexto_inicial: ContextoInicialDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterraccionDto)
  interacciones: InterraccionDto[];

  @IsString()
  informacion_final_caso: string;
}