import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { GatewaySearchService } from '../services/search.service';

@ApiTags('Gateway Search')
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
