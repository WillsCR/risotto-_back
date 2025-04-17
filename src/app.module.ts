import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import  * as dotenv from 'dotenv';
import { SimulationModule } from './simulation/simulation.module';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),UserModule,SimulationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
