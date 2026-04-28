import { Controller, Get, Query } from '@nestjs/common';
import { BffSearchService } from './search.service';

@Controller('search')
export class BffSearchController {
  constructor(private readonly searchService: BffSearchService) {}

  // GET /api/search?q=naruto&page=1&limit=10
  @Get()
  async search(
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.searchService.search(query, +page, +limit);
  }
}
