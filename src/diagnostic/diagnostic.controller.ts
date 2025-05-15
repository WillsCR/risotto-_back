import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { DiagnosticService } from "./diagnostic.service";
import { DiagnosticDto } from "./dto/diagnostic.dto";
import { Diagnostic } from "./schema/diagnostic.schema";


@Controller('diagnostic')
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}


    @Post('/create')
    async createDiagnostic(@Body() diagnosticDto: DiagnosticDto): Promise<Diagnostic> {
        return this.diagnosticService.createDiagnostic(diagnosticDto);
    }

}   