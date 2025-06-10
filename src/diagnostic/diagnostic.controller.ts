import { Controller, Post, Body, UsePipes, Param, Get, Res } from "@nestjs/common";
import { DiagnosticService } from "./diagnostic.service";
import { DiagnosticDto } from "./dto/diagnostic.dto";
import { Diagnostic } from "./schema/diagnostic.schema";
import { Response } from "express";

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

}


