import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
    IsArray,
    IsNumber,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  // Subclases
  
  class Accion {
    @IsOptional()
    @IsString()
    solicitud?: string;
  
    @IsOptional()
    informacion_entregada?: any;
  }
  
  class InteraccionPosible {
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
  
  class InformacionCondicional {
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
  
  class Interaccion {
    @IsNotEmpty()
    @IsString()
    rol: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Accion)
    acciones_iniciales?: Accion[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InformacionCondicional)
    informacion_condicional?: InformacionCondicional[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InteraccionPosible)
    interacciones_posibles?: InteraccionPosible[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    acciones_si_solicita?: string[];
  
    @IsOptional()
    indicaciones_hospitalizacion?: any;
  }
  
  class EnfermeraUrgencias {
    @IsNotEmpty()
    @IsString()
    informacion_inicial: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InformacionCondicional)
    informacion_condicional?: InformacionCondicional[];
  }
  
  class InformacionPaciente {
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
  
  class ContextoInicial {
    @IsNotEmpty()
    @IsString()
    descripcion: string;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => InformacionPaciente)
    informacion_paciente: InformacionPaciente;
  }
  
  class EntregaUrgencias {
    @IsOptional()
    @ValidateNested()
    @Type(() => EnfermeraUrgencias)
    enfermera?: EnfermeraUrgencias;
  }
  
  // DTO principal
  
  export class CreateCaseDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ContextoInicial)
    contexto_inicial: ContextoInicial;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => EntregaUrgencias)
    entrega_urgencias?: EntregaUrgencias;
  
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Interaccion)
    interacciones: Interaccion[];
  
    @IsNotEmpty()
    @IsString()
    informacion_final_caso: string;
  }
  