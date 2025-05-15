import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Case,CaseSchema } from "./schema/case.scheme";
import { SimulationService } from "./simulation.service";
import { SimulationController } from "./simulation.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Case.name , schema:CaseSchema}])],
    controllers:[SimulationController],
    providers:[SimulationService],
    exports:[SimulationService]
})
export class SimulationModule{}