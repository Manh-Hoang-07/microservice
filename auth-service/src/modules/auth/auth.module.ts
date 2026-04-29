import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import googleOAuthConfig from '../../config/google-oauth.config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginService } from './services/login.service';
import { AuthOtpService } from './services/auth-otp.service';
import { RegistrationService } from './services/registration.service';
import { PasswordService } from './services/password.service';
import { SocialAuthService } from './services/social-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(googleOAuthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LoginService,
    AuthOtpService,
    RegistrationService,
    PasswordService,
    SocialAuthService,
    GoogleStrategy,
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
