import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { Case } from './schema/case.scheme';
import { CreateCaseDto } from "./dto/case.dto";
import { Param } from '@nestjs/common';
import { CaseDto } from './dto/case2.dto';
@Controller('simulation')
export class SimulationController{
    constructor (private readonly simulationService:SimulationService) {}

    @Post('/case/create')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createCase(@Body() createCaseDto: CaseDto): Promise<Case> {
      return this.simulationService.createCase(createCaseDto);
    }

    @Get('/case')
    async getCases(): Promise<Case[]> {
        return this.simulationService.getCases();
    }   

    @Get('/case/:id')
    async getCaseById(@Param('id') id: string): Promise<Case> {
        return this.simulationService.getCaseById(id);
    }

    @Post('/case/update/:id')
    async updateCase(@Param('id') id: string, @Body() updateCaseDto: CreateCaseDto): Promise<Case> {
        return this.simulationService.updateCase(id, updateCaseDto);
    }
}