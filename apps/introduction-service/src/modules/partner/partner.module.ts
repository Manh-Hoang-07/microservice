import { Module } from '@nestjs/common';
import { AdminPartnerController } from './admin/controllers/partner.controller';
import { AdminPartnerService } from './admin/services/partner.service';
import { PublicPartnerController } from './public/controllers/partner.controller';
import { PublicPartnerService } from './public/services/partner.service';
import { PartnerRepository } from './repositories/partner.repository';

@Module({
  controllers: [AdminPartnerController, PublicPartnerController],
  providers: [PartnerRepository, AdminPartnerService, PublicPartnerService],
  exports: [PartnerRepository],
})
export class PartnerModule {}
