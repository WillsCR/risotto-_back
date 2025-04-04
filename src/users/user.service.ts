import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class UserService {
  private saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUserNoPassword(name: string, email: string): Promise<User> {
    const type = this.determineUserType(email); 
    const user = new this.userModel({ name, email, type });
    return user.save();
  }

  private determineUserType(email: string): string {
    if (email.endsWith('@alumnos.ucn.cl')) {
      return 'Estudiante';
    } else if (email.endsWith('@ucn.cl') || email.endsWith('@ce.ucn.cl')) {
      return 'Docente';
    } else {
      throw new Error('Correo no válido para registro'); 
    }
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