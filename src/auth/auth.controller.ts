import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, UseGuards, Request } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
