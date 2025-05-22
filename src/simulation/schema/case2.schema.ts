import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Opcion {
  @Prop({ required: true })
  texto: string;

  @Prop({ required: true })
  respuestaAsociada: string;

  @Prop({ required: true })
  esCorrecta: boolean;

  @Prop({ required: false })
  consecuencia?: string; // lo que ocurre si elige esta opción
}
export const OpcionSchema = SchemaFactory.createForClass(Opcion);


@Schema()
export class Pregunta {
  @Prop({ required: true })
  texto: string; // ¿Qué decides hacer?

  @Prop({ type: [OpcionSchema], required: true })
  opciones: Opcion[];
}
export const PreguntaSchema = SchemaFactory.createForClass(Pregunta);


@Schema()
export class Interraccion {
  @Prop({ required: true })
  nombreNPC: string;

  @Prop({ type: [PreguntaSchema], required: true })
  preguntas: Pregunta[];
}
export const InterraccionSchema = SchemaFactory.createForClass(Interraccion);

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
export class Case {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true, match: /(APS|Urgencia|Hospitalario)/ })
  tipo_caso: string;

  @Prop({ type: ContextoInicialSchema, required: true })
  contexto_inicial: ContextoInicial;

  @Prop({ type: [InterraccionSchema], required: true })
  interacciones: Interraccion[];

  @Prop({ required: true })
  informacion_final_caso: string;
}
export const CaseSchema = SchemaFactory.createForClass(Case);
