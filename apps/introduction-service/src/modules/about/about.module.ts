import { Module } from '@nestjs/common';
import { AdminAboutController } from './admin/controllers/about.controller';
import { AdminAboutService } from './admin/services/about.service';
import { PublicAboutController } from './public/controllers/about.controller';
import { PublicAboutService } from './public/services/about.service';

@Module({
  controllers: [AdminAboutController, PublicAboutController],
  providers: [AdminAboutService, PublicAboutService],
  exports: [PublicAboutService],
})
export class AboutModule {}
