import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class UserService {
  

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

 // En tu UserService
private determineUserType(email: string): string {
  if (email.endsWith('@alumnos.ucn.cl')) {
    return 'Estudiante';
  } else if (email.endsWith('@ucn.cl') || email.endsWith('@ce.ucn.cl')) {
    return 'Docente';
  } else {
    throw new Error('Correo no válido para registro');
  }
}

async getUserOrCreate( name : string, email: string): Promise<User> {
  console.log('Email recibido en getUserOrCreate:', email); // <--- LOG
  const ifUser = await this.userModel.findOne({ email }).exec();
  if (ifUser) {
    return ifUser;
  } else {
    return this.createUserNoPassword(name, email);
  }
}

async createUserNoPassword(name: string, email: string): Promise<UserDocument> {
  console.log('Email recibido en createUserNoPassword:', email); // <--- LOG
  const userType = this.determineUserType(email);
  const newUser = new this.userModel({
    name,
    email,
    type: userType,
  });
  return newUser.save();
}
  async loginUser(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || null; 
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || null; 
  }

  
}