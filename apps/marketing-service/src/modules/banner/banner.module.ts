import { Module } from '@nestjs/common';
import { AdminBannerController } from './admin/controllers/banner.controller';
import { AdminBannerService } from './admin/services/banner.service';
import { PublicBannerController } from './public/controllers/banner.controller';
import { PublicBannerService } from './public/services/banner.service';

@Module({
  controllers: [AdminBannerController, PublicBannerController],
  providers: [AdminBannerService, PublicBannerService],
  exports: [PublicBannerService],
})
export class BannerModule {}
