import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminTestimonialService } from '../services/testimonial.service';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
import { ListTestimonialAdminQueryDto } from '../dtos/list-testimonial.query.dto';

@Controller('admin/testimonials')
export class AdminTestimonialController {
  constructor(private readonly testimonialService: AdminTestimonialService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: ListTestimonialAdminQueryDto) {
    return this.testimonialService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.testimonialService.getOne(id);
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialService.create(dto);
  }

  @Permission('introduction.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialService.update(id, dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.testimonialService.delete(id);
  }
}
