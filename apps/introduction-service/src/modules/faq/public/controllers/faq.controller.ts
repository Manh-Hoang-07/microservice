import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PublicFaqService } from '../services/faq.service';

@ApiTags('Public FAQs')
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
    return this.faqService.getOne(toPrimaryKey(id));
  }

  @Public()
  @Post(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.faqService.incrementViewCount(toPrimaryKey(id));
  }

  @Public()
  @Post(':id/helpful')
  async incrementHelpfulCount(@Param('id') id: string) {
    return this.faqService.incrementHelpfulCount(toPrimaryKey(id));
  }
}
