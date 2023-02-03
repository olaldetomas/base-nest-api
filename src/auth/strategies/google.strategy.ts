import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('googleCredentials.clientID'),
      clientSecret: config.get('googleCredentials.clientSecret'),
      callbackURL: config.get('googleCredentials.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ) {
    const { displayName, emails } = profile;

    return {
      provider: 'google',
      name: displayName,
      email: emails[0].value,
    };
  }
}
