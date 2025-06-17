import { Controller, Post, Body, UsePipes, Param, Get, Res, Delete, UseGuards } from "@nestjs/common";
import { DiagnosticService } from "./diagnostic.service";
import { DiagnosticDto } from "./dto/diagnostic.dto";
import { Diagnostic } from "./schema/diagnostic.schema";
import { Response } from "express";
import { GoogleAuthGuard } from "src/auth/authGuard";

//UseGuards(GoogleAuthGuard)
@Controller('diagnostic')
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}


    @Post('/create')
    async createDiagnostic(@Body() diagnosticDto: DiagnosticDto): Promise<Diagnostic> {
        return this.diagnosticService.createDiagnostic(diagnosticDto);
    }

    @Get('/:id')
    async getDiagnostic(@Param('id') id: string): Promise<Diagnostic> {
        return this.diagnosticService.findById(id);
    }

    @Get()
    async getAll(): Promise<Diagnostic[]> {
        return this.diagnosticService.findAll();
    }

    @Delete(':id')
    async deleteDiagnostic(@Param('id') id: string): Promise<any> {
     return this.diagnosticService.deleteDiagnostic(id);
    }


}


