import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { Case } from './schema/case.scheme';


@Controller('simulation')
export class SimulationController{
    constructor (private readonly simulationService:SimulationService) {}

}