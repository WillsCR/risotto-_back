import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class AccionDto {
  @IsOptional()
  @IsString()
  solicitud?: string;

  @IsOptional()
  @IsObject()
  informacion_entregada?: Record<string, any>;
}

class InteraccionPosibleDto {
  @IsOptional()
  @IsString()
  pregunta?: string;

  @IsOptional()
  @IsString()
  respuesta?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  posibles_respuestas?: string[];
}

class InformacionCondicionalDto {
  @IsOptional()
  @IsString()
  pregunta_trigger?: string;

  @IsOptional()
  @IsString()
  momento_trigger?: string;

  @IsNotEmpty()
  @IsString()
  respuesta: string;
}

class InteraccionDto {
  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AccionDto)
  acciones_iniciales?: AccionDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InformacionCondicionalDto)
  informacion_condicional?: InformacionCondicionalDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InteraccionPosibleDto)
  interacciones_posibles?: InteraccionPosibleDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  acciones_si_solicita?: string[];

  @IsOptional()
  @IsObject()
  indicaciones_hospitalizacion?: Record<string, any>;
}

class InformacionPacienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  edad: number;

  @IsNotEmpty()
  @IsString()
  diagnostico_previo: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  diagnostico_actual: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antecedentes_relevantes?: string[];
}

class ContextoInicialDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InformacionPacienteDto)
  informacion_paciente: InformacionPacienteDto;
}

class EnfermeraUrgenciasDto {
  @IsNotEmpty()
  @IsString()
  informacion_inicial: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InformacionCondicionalDto)
  informacion_condicional?: InformacionCondicionalDto[];
}

class EntregaUrgenciasDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => EnfermeraUrgenciasDto)
  enfermera?: EnfermeraUrgenciasDto;
}

export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContextoInicialDto)
  contexto_inicial: ContextoInicialDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntregaUrgenciasDto)
  entrega_urgencias?: EntregaUrgenciasDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InteraccionDto)
  interacciones: InteraccionDto[];

  @IsNotEmpty()
  @IsString()
  informacion_final_caso: string;
}
