import { Module } from '@nestjs/common';
import { AdminTestimonialController } from './admin/controllers/testimonial.controller';
import { AdminTestimonialService } from './admin/services/testimonial.service';
import { PublicTestimonialController } from './public/controllers/testimonial.controller';
import { PublicTestimonialService } from './public/services/testimonial.service';
import { TestimonialRepository } from './repositories/testimonial.repository';

@Module({
  controllers: [AdminTestimonialController, PublicTestimonialController],
  providers: [TestimonialRepository, AdminTestimonialService, PublicTestimonialService],
  exports: [TestimonialRepository],
})
export class TestimonialModule {}
