import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from '../guards/google-auth.guard';

@Controller('auth')
export class AuthController {
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
