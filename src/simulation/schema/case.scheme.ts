import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type CaseDocument = Case & Document;

// ───── SUBDOCUMENTOS ─────

@Schema()
export class Accion {
  @Prop()
  solicitud?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  informacion_entregada?: Record<string, any>; 
}

export const AccionSchema = SchemaFactory.createForClass(Accion);

@Schema()
export class InteraccionPosible {
  @Prop()
  pregunta?: string;

  @Prop()
  respuesta?: string;

  @Prop({ type: [String] })
  posibles_respuestas?: string[];
}

export const InteraccionPosibleSchema = SchemaFactory.createForClass(InteraccionPosible);

@Schema()
export class InformacionCondicional {
  @Prop()
  pregunta_trigger?: string;

  @Prop()
  momento_trigger?: string;

  @Prop({ required: true })
  respuesta: string;
}

export const InformacionCondicionalSchema = SchemaFactory.createForClass(InformacionCondicional);

@Schema()
export class Interaccion {
  @Prop({ required: true })
  rol: string;

  @Prop({ type: [AccionSchema] })
  acciones_iniciales?: Accion[];

  @Prop({ type: [InformacionCondicionalSchema] })
  informacion_condicional?: InformacionCondicional[];

  @Prop({ type: [InteraccionPosibleSchema] })
  interacciones_posibles?: InteraccionPosible[];

  @Prop({ type: [String] })
  acciones_si_solicita?: string[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  indicaciones_hospitalizacion?: Record<string, any>; 
}

export const InteraccionSchema = SchemaFactory.createForClass(Interaccion);

@Schema()
export class InformacionPaciente {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  edad: number;

  @Prop({ required: true })
  diagnostico_previo: string;

  @Prop({ type: [String], required: true })
  diagnostico_actual: string[];

  @Prop({ type: [String], required: false })
  antecedentes_relevantes?: string[];
}

export const InformacionPacienteSchema = SchemaFactory.createForClass(InformacionPaciente);

@Schema()
export class ContextoInicial {
  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: InformacionPacienteSchema, required: true })
  informacion_paciente: InformacionPaciente;
}

export const ContextoInicialSchema = SchemaFactory.createForClass(ContextoInicial);

@Schema()
export class EnfermeraUrgencias {
  @Prop({ required: true })
  informacion_inicial: string;

  @Prop({ type: [InformacionCondicionalSchema] })
  informacion_condicional?: InformacionCondicional[];
}

export const EnfermeraUrgenciasSchema = SchemaFactory.createForClass(EnfermeraUrgencias);

@Schema()
export class EntregaUrgencias {
  @Prop({ type: EnfermeraUrgenciasSchema, required: false })
  enfermera?: EnfermeraUrgencias;
}

export const EntregaUrgenciasSchema = SchemaFactory.createForClass(EntregaUrgencias);

// ───── DOCUMENTO PRINCIPAL ─────

@Schema()
export class Case {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true , match: /(APS|Urgencia|Hospitario)/})
  tipo_caso: string;

  @Prop({ type: ContextoInicialSchema, required: true })
  contexto_inicial: ContextoInicial;

  @Prop({ type: EntregaUrgenciasSchema })
  entrega_urgencias?: EntregaUrgencias;

  @Prop({ type: [InteraccionSchema], required: true })
  interacciones: Interaccion[];

  @Prop({ required: true })
  informacion_final_caso: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
