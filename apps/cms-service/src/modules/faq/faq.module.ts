import { Module } from '@nestjs/common';
import { AdminFaqController } from './admin/controllers/faq.controller';
import { AdminFaqService } from './admin/services/faq.service';
import { PublicFaqController } from './public/controllers/faq.controller';
import { PublicFaqService } from './public/services/faq.service';
import { FaqRepository } from './repositories/faq.repository';

@Module({
  controllers: [AdminFaqController, PublicFaqController],
  providers: [FaqRepository, AdminFaqService, PublicFaqService],
  exports: [FaqRepository],
})
export class FaqModule {}
