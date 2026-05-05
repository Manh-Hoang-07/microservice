import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import googleOAuthConfig from '../../core/config/google-oauth.config';
import { KafkaModule } from '../../kafka/kafka.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginService } from './services/login.service';
import { AuthOtpService } from './services/auth-otp.service';
import { RegistrationService } from './services/registration.service';
import { PasswordService } from './services/password.service';
import { SocialAuthService } from './services/social-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { GoogleOauthStateService } from './services/google-state.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(googleOAuthConfig),
    KafkaModule,
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    AuthService,
    TokenService,
    LoginService,
    AuthOtpService,
    RegistrationService,
    PasswordService,
    SocialAuthService,
    GoogleOauthStateService,
    GoogleOAuthGuard,
    {
      provide: GoogleStrategy,
      useFactory: (configService: ConfigService) => {
        const clientId = configService.get<string>('googleOAuth.clientId');
        if (!clientId) return null;
        return new GoogleStrategy(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
