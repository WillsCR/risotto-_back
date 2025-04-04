import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import  * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    
    MongooseModule.forRoot(process.env.MONGO_URI),UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
