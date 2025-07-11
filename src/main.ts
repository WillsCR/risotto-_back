import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

//para ocupar el .env
dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://'+process.env.FRONT+':5173'],
    methods: 'GET,POST,PUT,DELETE,PATCH',
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT, '0.0.0.0'); 
}
bootstrap();
