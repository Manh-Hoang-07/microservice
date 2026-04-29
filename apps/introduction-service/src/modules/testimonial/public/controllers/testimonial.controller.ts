import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicTestimonialService } from '../services/testimonial.service';

@ApiTags('Public Testimonials')
@Controller('public/testimonials')
export class PublicTestimonialController {
  constructor(private readonly testimonialService: PublicTestimonialService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.testimonialService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.testimonialService.getOne(BigInt(id));
  }
}
