import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
                                                   
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserNoPassword(createUserDto.name, createUserDto.email);
  }

  @Get('/login/:email')
  async loginUser(@Body() email: string) {
    return this.userService.loginUser(email);
  }

  @Get('/user/:email')
  async getUser(@Body() email: string) {
    return this.userService.getUserByEmail(email);
  }
}