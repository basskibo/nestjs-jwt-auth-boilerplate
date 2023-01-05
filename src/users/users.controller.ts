import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import bcrypt, { hash } from 'bcrypt';
import { Query } from 'mongoose';
import { NotAcceptableException, ConflictException } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('birthday') birthday: Date,
  ): Promise<User> {
    try {
      const saltRound = 10;
      const hashedPassword = await hash(password, saltRound);
      const result = await this.usersService.createUser(
        username,
        hashedPassword,
        email,
        firstName,
        lastName,
        birthday,
      );
      console.log(result);
      return result;
    } catch (exc) {
      console.log('>>>>>>>>>>>>>');
      console.log(exc);
      switch (exc.code) {
        case 11000:
          throw new ConflictException(
            `User with ${
              exc.keyPattern.username ? username : email
            } already exists`,
          );
          break;
        default:
          throw new NotAcceptableException(
            'Error happened while creating user, please try again.',
          );
          break;
      }
    }
  }
  @Get('/:username')
  async getUser(@Param('username') username: string): Promise<User> {
    const result = await this.usersService.getUser({ username: username });
    console.log(result);
    return result;
  }
  @Get('/')
  async findAll(): Promise<User[]> {
    return this.usersService.getAll({});
  }
}
