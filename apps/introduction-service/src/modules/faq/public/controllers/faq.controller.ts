import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicFaqService } from '../services/faq.service';

@Controller('public/faqs')
export class PublicFaqController {
  constructor(private readonly faqService: PublicFaqService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.faqService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.faqService.getOne(id);
  }

  @Public()
  @Post(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.faqService.incrementViewCount(id);
  }

  @Public()
  @Post(':id/helpful')
  async incrementHelpfulCount(@Param('id') id: string) {
    return this.faqService.incrementHelpfulCount(id);
  }
}
