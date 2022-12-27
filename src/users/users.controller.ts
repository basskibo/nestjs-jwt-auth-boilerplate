import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import bcrypt, { hash } from 'bcrypt';
import { Query } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User> {
    const saltRound = 10;
    const hashedPassword = await hash(password, saltRound);
    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      firstName,
      lastName,
    );
    return result;
  }
  @Get('/:username')
  async getUser(
    @Param('username') username: string,
    @Param('firstName') firstName ): Promise<User> {
    console.log(">>>>>>", username)
    console.log(">>>>>>", firstName)
    const result = await this.usersService.getUser({ username: username });
    console.log(result)
    return result;
  }
}
