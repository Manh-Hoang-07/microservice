import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { Throttle } from '@nestjs/throttler';
import { GatewaySearchService } from '../services/search.service';
import { SearchQueryDto } from '../dtos/search.dto';

@Controller('search')
export class GatewaySearchController {
  constructor(private readonly searchService: GatewaySearchService) {}

  // Search is heavier than other public endpoints (fans out to two upstreams).
  // Tighten throttle so a single IP can't flood it.
  @Public()
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Get()
  async search(@Query() query: SearchQueryDto) {
    return this.searchService.search(query.q ?? '', query.page ?? 1, query.limit ?? 10);
  }
}
