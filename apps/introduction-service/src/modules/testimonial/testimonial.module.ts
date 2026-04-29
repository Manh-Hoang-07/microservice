import { Module } from '@nestjs/common';
import { AdminTestimonialController } from './admin/controllers/testimonial.controller';
import { AdminTestimonialService } from './admin/services/testimonial.service';
import { PublicTestimonialController } from './public/controllers/testimonial.controller';
import { PublicTestimonialService } from './public/services/testimonial.service';

@Module({
  controllers: [AdminTestimonialController, PublicTestimonialController],
  providers: [AdminTestimonialService, PublicTestimonialService],
  exports: [PublicTestimonialService],
})
export class TestimonialModule {}
