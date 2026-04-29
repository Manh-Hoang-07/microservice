import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { Response, Request } from 'express';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SendOtpDto } from '../dto/send-otp.dto';
import { Public } from '../../../common/permission.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiTooManyRequestsResponse({ description: 'Too many login attempts' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    if (result?.token) {
      const domain = res.req.hostname === 'localhost' ? 'localhost' : undefined;
      res.cookie('auth_token', result.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
        secure: false,
        domain,
        path: '/',
      });
    }
    return result;
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Register new account' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'Registration successful' })
  @ApiBadRequestResponse({ description: 'Invalid data or email already in use' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout and blacklist token' })
  @Post('logout')
  async logout(
    @Headers('authorization') authHeader: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let token: string | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    await this.authService.logout(null, token || undefined);
    const domain = res.req.hostname === 'localhost' ? 'localhost' : undefined;
    res.clearCookie('auth_token', { domain, path: '/' });
    return null;
  }

  @Public()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ description: 'Token refreshed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid or expired refresh token' })
  @Post('refresh')
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refreshTokenByValue(dto.refreshToken);
    if (result?.token) {
      const domain = res.req.hostname === 'localhost' ? 'localhost' : undefined;
      res.cookie('auth_token', result.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
        secure: false,
        domain,
        path: '/',
      });
    }
    return result;
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Public()
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @ApiOperation({ summary: 'Send registration OTP' })
  @ApiBody({ type: SendOtpDto })
  @Post('register/send-otp')
  async registerSendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtpForRegister(dto);
  }

  @Public()
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @ApiOperation({ summary: 'Send forgot password OTP' })
  @ApiBody({ type: SendOtpDto })
  @Post('forgot-password/send-otp')
  async forgotPasswordSendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtpForForgotPassword(dto);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {
    // Guard redirects to Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback handler' })
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;
    const result = await this.authService.handleGoogleAuth(user);

    if (result?.token) {
      const frontendUrl =
        this.configService.get<string>('googleOAuth.frontendUrl') ||
        'http://localhost:3000';
      const redirectUrl = `${frontendUrl}/auth/google/callback?token=${result.token}&refreshToken=${result.refreshToken}&expiresIn=${result.expiresIn}`;
      return res.redirect(redirectUrl);
    }

    return res.redirect(
      (this.configService.get<string>('googleOAuth.frontendUrl') || 'http://localhost:3000') +
        '/login?error=auth_failed',
    );
  }
}
