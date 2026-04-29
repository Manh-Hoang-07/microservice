import { Module } from '@nestjs/common';
import { AdminBannerController } from './admin/controllers/banner.controller';
import { AdminBannerService } from './admin/services/banner.service';
import { PublicBannerController } from './public/controllers/banner.controller';
import { PublicBannerService } from './public/services/banner.service';
import { BannerRepository } from './repositories/banner.repository';
import { BannerLocationModule } from '../banner-location/banner-location.module';

@Module({
  imports: [BannerLocationModule],
  controllers: [AdminBannerController, PublicBannerController],
  providers: [BannerRepository, AdminBannerService, PublicBannerService],
  exports: [BannerRepository],
})
export class BannerModule {}
