import { IsEmail, IsNotEmpty, MinLength, Matches, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Matches(/@(alumnos\.ucn\.cl|ucn\.cl|ce\.ucn\.cl)$/, { 
    message: 'El correo debe pertenecer a un dominio permitido (@alumnos.ucn.cl, @ucn.cl, @ce.ucn.cl)' 
  })
  email: string;

  @IsOptional() 
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @Matches(/(Estudiante|Docente)/, { 
    message: 'El tipo de usuario debe ser Estudiante o Docente' 
  })
  type?: string;
}

