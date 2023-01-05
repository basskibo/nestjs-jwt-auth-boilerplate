import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: Date,
  ): Promise<User> {
    return this.userModel.create({
      username,
      email,
      password,
      firstName,
      lastName,
      birthday,
    });
  }

  async getUser(query: object): Promise<User> {
    console.log(query);
    return this.userModel.findOne(query);
  }

  async getAll(query: object): Promise<User[]> {
    console.log(query);
    const users = this.userModel.find().exec();
    return users;
    // return { users: users, length: users.length }
  }
}
