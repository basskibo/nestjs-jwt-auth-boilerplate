import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { NotAcceptableException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ username });
    if (!user) return null;
    const passwordValid = await compare(password, user.password);
    if (!user)
      throw new NotAcceptableException(`Could not find username ${username}`);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
