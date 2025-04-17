import { Module } from '@nestjs/common';
import { GoogleAuthGuard } from './authGuard';

@Module({
  providers: [GoogleAuthGuard],
  exports: [GoogleAuthGuard],
})
export class AuthModule {}