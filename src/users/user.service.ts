import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schema/user.schema";
import {Model} from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser (name: string, email: string, password: string): Promise<User> {
        //aun no metodos de validacion
        const user = new this.userModel({name, email, password});
        return user.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    };



}