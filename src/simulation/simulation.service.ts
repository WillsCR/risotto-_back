import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Case,CaseDocument } from "./schema/case.scheme";
import { CreateCaseDto } from "./dto/case.dto";

@Injectable()
export class SimulationService{
    constructor(@InjectModel (Case.name) private caseModel: Model<CaseDocument>){}

    async getCases(): Promise<Case[]>{
        return this.caseModel.find().exec();
    }
    //Validar esta parte
    async createCase(createCaseDto: CreateCaseDto): Promise<Case> {
        const createdCase = new this.caseModel(createCaseDto);
        return createdCase.save();
        
      }
}