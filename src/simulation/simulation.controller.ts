import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { Case } from './schema/case.scheme';
import { CreateCaseDto } from "./dto/case.dto";
import { Param } from '@nestjs/common';
import { CaseDto } from './dto/case2.dto';
import { GoogleAuthGuard } from 'src/auth/authGuard';
import { isValidObjectId } from 'mongoose';

//@UseGuards(GoogleAuthGuard)
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
    if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido');
    }
    return this.simulationService.getCaseById(id);    
    }
    
    @Post('/case/update/:id')
    async updateCase(@Param('id') id: string, @Body() updateCaseDto: CreateCaseDto): Promise<Case> {
        return this.simulationService.updateCase(id, updateCaseDto);
    }

    @Post('/case/testguard')
    async testGuard() {
        return { message: 'Guard is working!' };
    }
}