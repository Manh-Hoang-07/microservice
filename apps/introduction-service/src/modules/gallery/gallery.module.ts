import { Module } from '@nestjs/common';
import { AdminGalleryController } from './admin/controllers/gallery.controller';
import { AdminGalleryService } from './admin/services/gallery.service';
import { PublicGalleryController } from './public/controllers/gallery.controller';
import { PublicGalleryService } from './public/services/gallery.service';

@Module({
  controllers: [AdminGalleryController, PublicGalleryController],
  providers: [AdminGalleryService, PublicGalleryService],
  exports: [PublicGalleryService],
})
export class GalleryModule {}
