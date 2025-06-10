import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Diagnostic, DiagnosticDocument } from "./schema/diagnostic.schema";
import { DiagnosticDto } from "./dto/diagnostic.dto";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

import * as fs from 'fs';   

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectModel(Diagnostic.name)
    private diagnosticModel: Model<DiagnosticDocument>
  ) {}

  async getDiagnostics(): Promise<Diagnostic[]> {
    return this.diagnosticModel.find().exec();
  }

  async createDiagnostic(diagnosticDto: DiagnosticDto): Promise<Diagnostic> {
    const createdDiagnostic = new this.diagnosticModel(diagnosticDto);
    return createdDiagnostic.save();
  }
  async findById(id: string): Promise<Diagnostic> {
        return this.diagnosticModel.findById(id).exec();
  }
  
}

