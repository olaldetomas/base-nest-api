import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  // @Post('/register')
  // @UseGuards(LocalAuthGuard)
  // async register(@Body() registerUserDto: RegisterUserDto) {
  //   return await this.authService.register(req.user);
  // }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Request() req) {
    // Guard redirects
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req) {
    return req.user;
  }
}
