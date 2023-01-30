import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, GoogleOauthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
