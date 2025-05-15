import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Diagnostic, DiagnosticDocument } from "./schema/diagnostic.schema";
import { DiagnosticDto } from "./dto/diagnostic.dto";



@Injectable()
export class DiagnosticService {
    
    constructor(@InjectModel(Diagnostic.name) private diagnosticModel: Model<DiagnosticDocument>) {}

    async getDiagnostics(): Promise<Diagnostic[]> {
        return this.diagnosticModel.find().exec();
    }

    async createDiagnostic(diagnosticDto: DiagnosticDto): Promise<Diagnostic> {
        const createdDiagnostic = new this.diagnosticModel(diagnosticDto);
        return createdDiagnostic.save();
    }

}