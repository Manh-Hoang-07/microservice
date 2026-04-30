import { Module } from '@nestjs/common';
import { AdminContentTemplateController } from './admin/controllers/content-template.controller';
import { AdminContentTemplateService } from './admin/services/content-template.service';
import { ContentTemplateRepository } from './repositories/content-template.repository';

@Module({
  controllers: [AdminContentTemplateController],
  providers: [ContentTemplateRepository, AdminContentTemplateService],
})
export class ContentTemplateModule {}
