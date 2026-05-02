import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { GatewaySearchService } from '../services/search.service';

@Controller('search')
export class GatewaySearchController {
  constructor(private readonly searchService: GatewaySearchService) {}

  @Public()
  @Get()
  async search(
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.searchService.search(query, +page, +limit);
  }
}
