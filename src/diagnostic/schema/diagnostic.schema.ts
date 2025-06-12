import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";


export type DiagnosticDocument = Diagnostic & Document;

@Schema()
export class Diagnostic {

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  case_id: Types.ObjectId;

  @Prop({ required: true }) 
  user_name: string; 

  @Prop({ required: true })
  case_info: string; 

  @Prop({ required: true, type: Date, default: Date.now })
  date: Date;
}


export const DiagnosticSchema = SchemaFactory.createForClass(Diagnostic);