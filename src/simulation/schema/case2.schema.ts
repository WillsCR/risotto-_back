import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class OpcionesAsociadas {
  @Prop({ required: true })
  esCorrecta: boolean;

  @Prop()
  consecuencia: string;
}
export const OpcionesAsociadasSchema = SchemaFactory.createForClass(OpcionesAsociadas);

@Schema()
export class Opcion {
  @Prop({ required: true })
  texto: string;

  @Prop({ required: false })
  reaccion?: string;

  @Prop({ type: [OpcionesAsociadasSchema], required: true })
  OpcionesAsociadas: OpcionesAsociadas[];
}
export const OpcionSchema = SchemaFactory.createForClass(Opcion);

@Schema()
export class Relato {
  @Prop({ required: true })
  pregunta: string;

  @Prop({ required: true })
  texto: string;

  @Prop({ type: [OpcionSchema], required: true })
  opciones: Opcion[];
}
export const RelatoSchema = SchemaFactory.createForClass(Relato);

@Schema()
export class Interraccion {
  @Prop({ required: true })
  nombreNPC: string;

  @Prop({ required: false })
  descripcion?: string;

  @Prop({ type: [RelatoSchema], required: true })
  preguntas: Relato[];
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

  /*
  @Prop({ required: true })
  informacion_final_caso: string; no se usa esto
  */
}
export const CaseSchema = SchemaFactory.createForClass(Case);
