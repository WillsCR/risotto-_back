import { Controller, Get, Post, Body, UsePipes, ValidationPipe , Param} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))                                                  
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.getUserOrCreate(createUserDto.name, createUserDto.email);
  }

  @Get('/user/:email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}