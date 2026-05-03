import { Controller, Get } from '@nestjs/common';
import { JwksService } from '../services/jwks.service';
import { Public } from '@package/common';

@Controller('.well-known')
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  @Get('jwks.json')
  @Public()
  async getJwks() {
    return this.jwksService.getJwkSet();
  }
}
