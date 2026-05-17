import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientId = configService.get<string>('googleOAuth.clientId') || '';
    const clientSecret = configService.get<string>('googleOAuth.clientSecret') || '';
    const callbackURL = configService.get<string>('googleOAuth.callbackURL');

    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const id = profile?.id;
    const emailEntry = profile?.emails?.[0];
    const email = emailEntry?.value;
    if (!id || !email) {
      return done(new Error('Google profile missing id or email'), undefined);
    }
    // Reject unverified Google emails. Google lets users add emails to their
    // account without proving ownership; logging in with such an email would
    // let an attacker hijack an existing account that uses that email.
    if (emailEntry?.verified !== true && emailEntry?.verified !== 'true') {
      return done(new Error('Google email not verified'), undefined);
    }
    const user = {
      googleId: String(id),
      email,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
      picture: profile?.photos?.[0]?.value,
      accessToken,
    };
    done(null, user);
  }
}
