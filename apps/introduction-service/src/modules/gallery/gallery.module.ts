import { Module } from '@nestjs/common';
import { AdminGalleryController } from './admin/controllers/gallery.controller';
import { AdminGalleryService } from './admin/services/gallery.service';
import { PublicGalleryController } from './public/controllers/gallery.controller';
import { PublicGalleryService } from './public/services/gallery.service';
import { GalleryRepository } from './repositories/gallery.repository';

@Module({
  controllers: [AdminGalleryController, PublicGalleryController],
  providers: [GalleryRepository, AdminGalleryService, PublicGalleryService],
  exports: [GalleryRepository],
})
export class GalleryModule {}
