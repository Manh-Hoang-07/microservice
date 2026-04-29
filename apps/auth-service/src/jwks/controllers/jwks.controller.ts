import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwksService } from '../services/jwks.service';
import { Public } from '@package/common';

@ApiTags('JWKS')
@Controller('.well-known')
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  @Get('jwks.json')
  @Public()
  @ApiOperation({ summary: 'RSA public key set for JWT verification' })
  async getJwks() {
    return this.jwksService.getJwkSet();
  }
}
