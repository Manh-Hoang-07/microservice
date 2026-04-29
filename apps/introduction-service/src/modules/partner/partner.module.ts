import { Module } from '@nestjs/common';
import { AdminPartnerController } from './admin/controllers/partner.controller';
import { AdminPartnerService } from './admin/services/partner.service';
import { PublicPartnerController } from './public/controllers/partner.controller';
import { PublicPartnerService } from './public/services/partner.service';

@Module({
  controllers: [AdminPartnerController, PublicPartnerController],
  providers: [AdminPartnerService, PublicPartnerService],
  exports: [PublicPartnerService],
})
export class PartnerModule {}
