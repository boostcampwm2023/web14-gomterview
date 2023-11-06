import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import 'dotenv/config';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    };
  }
}
