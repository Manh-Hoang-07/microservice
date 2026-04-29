import { Module } from '@nestjs/common';
import { AdminBannerLocationController } from './admin/controllers/banner-location.controller';
import { AdminBannerLocationService } from './admin/services/banner-location.service';
import { BannerLocationRepository } from './repositories/banner-location.repository';

@Module({
  controllers: [AdminBannerLocationController],
  providers: [BannerLocationRepository, AdminBannerLocationService],
  exports: [BannerLocationRepository],
})
export class BannerLocationModule {}
