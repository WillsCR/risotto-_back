import { Module } from "@nestjs/common";
import { DiagnosticService } from "./diagnostic.service";
import { DiagnosticController } from "./diagnostic.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Diagnostic, DiagnosticSchema } from "./schema/diagnostic.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Diagnostic.name, schema: DiagnosticSchema }])],
    controllers: [DiagnosticController],	
    providers: [DiagnosticService],
    exports: [DiagnosticService]
})
export class DiagnosticModule {}
