import { RegisterUserDto } from 'src/auth/dto/register-user-dto';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    const token = await this.authService.generateToken(req.user);
    return token;
  }

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    const user = this.authService.loginFromGoogle(req.user);
    if (user) {
      return await this.authService.generateToken(req.user);
    }
    throw new InternalServerErrorException('Something went wrong');
  }
}
