import { Module } from '@nestjs/common';
import { AdminBannerLocationController } from './admin/controllers/banner-location.controller';
import { AdminBannerLocationService } from './admin/services/banner-location.service';

@Module({
  controllers: [AdminBannerLocationController],
  providers: [AdminBannerLocationService],
  exports: [AdminBannerLocationService],
})
export class BannerLocationModule {}
