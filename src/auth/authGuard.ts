import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token');
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, 
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Token inválido');
      }

      
      const allowedDomains = ['alumnos.ucn.cl', 'ucn.cl', 'ce.ucn.cl'];
      const emailDomain = payload.email?.split('@')[1];
      if (!allowedDomains.includes(emailDomain)) {
        throw new UnauthorizedException('Dominio no permitido');
      }
      request.user = {
        email: payload.email,
        name: payload.name,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}