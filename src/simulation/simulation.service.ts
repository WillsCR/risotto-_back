import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Types } from 'mongoose';
import { Case,CaseDocument } from "./schema/case.scheme";
import { CreateCaseDto } from "./dto/case.dto";
import { CaseDto } from "./dto/case2.dto";

@Injectable()
export class SimulationService{
    constructor(@InjectModel (Case.name) private caseModel: Model<CaseDocument>){}

    async getCases(): Promise<Case[]>{
        return this.caseModel.find().exec();
    }
    //Validar esta parte
    async createCase(createCaseDto: CaseDto): Promise<Case> {
        const createdCase = new this.caseModel(createCaseDto);
        return createdCase.save();
        
    }
    async getCaseById(id: string): Promise<Case> {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
          }
          return this.caseModel.findById(id);
    }    
    async updateCase(id: string, updateCaseDto: CreateCaseDto): Promise<Case> {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        const updatedCase = await this.caseModel.findByIdAndUpdate(id, updateCaseDto, { new: true });
        if (!updatedCase) {
            throw new Error('Caso no encontrado');
        }
        return updatedCase;
    }

}