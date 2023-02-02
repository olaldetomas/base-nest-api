import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload-interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, email: payload.email };
  }
}
