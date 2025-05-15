import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import  * as dotenv from 'dotenv';
import { SimulationModule } from './simulation/simulation.module';
import { Diagnostic } from './diagnostic/schema/diagnostic.schema';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),UserModule,SimulationModule,DiagnosticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
