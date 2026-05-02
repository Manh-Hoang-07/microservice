import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { Throttle } from '@nestjs/throttler';
import { PublicFaqService } from '../services/faq.service';
import { ListFaqPublicQueryDto } from '../../admin/dtos/list-faq.query.dto';

@Controller('public/faqs')
export class PublicFaqController {
  constructor(private readonly faqService: PublicFaqService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListFaqPublicQueryDto) {
    return this.faqService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.faqService.getOne(id);
  }

  // Public counter increments are abuse magnets — without throttling, a
  // single IP can pump arbitrary view/helpful counters. Tight per-IP cap.
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.faqService.incrementViewCount(id);
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post(':id/helpful')
  async incrementHelpfulCount(@Param('id') id: string) {
    return this.faqService.incrementHelpfulCount(id);
  }
}
