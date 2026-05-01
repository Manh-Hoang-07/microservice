import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { Response, Request } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';
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
import { TokenService } from '../services/token.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SendOtpDto } from '../dto/send-otp.dto';
import { LogoutDto } from '../dto/logout.dto';
import { Public } from '@package/common';
import {
  REFRESH_COOKIE,
  clearAuthCookies,
  extractBearer,
  requireUserId,
  setAuthCookies,
} from '../utils/auth-cookies.util';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private get isProd(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'production';
  }

  private writeAuthCookies(req: Request, res: Response, accessToken: string, refreshToken: string): void {
    setAuthCookies(req, res, accessToken, refreshToken, {
      accessMs: this.tokenService.getAccessTtlSec() * 1000,
      refreshMs: this.tokenService.getRefreshTtlSec() * 1000,
    }, this.isProd);
  }

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    this.writeAuthCookies(req, res, result.token, result.refreshToken);
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
  @ApiOperation({ summary: 'Logout current session (revokes the provided refresh token)' })
  @ApiBody({ type: LogoutDto, required: false })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Headers('authorization') authHeader: string,
    @Body() dto: LogoutDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = extractBearer(authHeader);
    const refreshToken = dto?.refreshToken ?? (req.cookies?.[REFRESH_COOKIE] as string | undefined);
    await this.authService.logout(accessToken, refreshToken);
    clearAuthCookies(req, res, this.isProd);
    return { success: true };
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout from every active session for the current user' })
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  async logoutAll(
    @Headers('authorization') authHeader: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = extractBearer(authHeader);
    const userId = requireUserId(req);
    await this.authService.logoutAll(BigInt(userId), accessToken);
    clearAuthCookies(req, res, this.isProd);
    return { success: true };
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ description: 'Token refreshed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid or expired refresh token' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = dto.refreshToken || (req.cookies?.[REFRESH_COOKIE] as string | undefined);
    if (!refreshToken) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new InternalServerErrorException(
        this.i18n.t('auth.REFRESH_TOKEN_REQUIRED', { lang }),
      );
    }
    const result = await this.authService.refreshTokenByValue(refreshToken);
    this.writeAuthCookies(req, res, result.token, result.refreshToken);
    return result;
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @Get('me')
  async me(@Req() req: Request) {
    const userId = requireUserId(req);
    return this.authService.me(BigInt(userId));
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);
    return { success: true };
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { success: true };
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
    const frontendUrl = this.configService.get<string>('googleOAuth.frontendUrl');
    if (!frontendUrl) throw new InternalServerErrorException('GOOGLE_FRONTEND_URL not configured');

    const profile = req.user as any;
    const result = await this.authService.handleGoogleAuth(profile);

    if (!result?.token) {
      return res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }

    this.writeAuthCookies(req, res, result.token, result.refreshToken);
    return res.redirect(`${frontendUrl}/auth/google/success`);
  }
}
