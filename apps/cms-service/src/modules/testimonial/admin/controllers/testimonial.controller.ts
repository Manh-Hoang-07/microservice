import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminTestimonialService } from '../services/testimonial.service';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
import { ListTestimonialAdminQueryDto } from '../dtos/list-testimonial.query.dto';

@Controller('admin/testimonials')
export class AdminTestimonialController {
  constructor(private readonly testimonialService: AdminTestimonialService) {}

  @Permission('cms.testimonial.manage')
  @Get()
  async getList(@Query() query: ListTestimonialAdminQueryDto) {
    return this.testimonialService.getList(query);
  }

  @Permission('cms.testimonial.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.testimonialService.getOne(id);
  }

  @Permission('cms.testimonial.manage')
  @AuditLog({ action: 'cms.testimonial.create', resource: 'testimonial' })
  @Post()
  async create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialService.create(dto);
  }

  @Permission('cms.testimonial.manage')
  @AuditLog({ action: 'cms.testimonial.update', resource: 'testimonial' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialService.update(id, dto);
  }

  @Permission('cms.testimonial.manage')
  @AuditLog({ action: 'cms.testimonial.delete', resource: 'testimonial' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.testimonialService.delete(id);
  }
}
