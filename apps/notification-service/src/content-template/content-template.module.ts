import { Module } from '@nestjs/common';
import { ContentRendererService } from './services/content-renderer.service';
import { ContentTemplateExecutionService } from './services/content-template-execution.service';
import { AdminContentTemplateController } from './admin/controllers/content-template.controller';
import { AdminContentTemplateService } from './admin/services/content-template.service';
import { ContentTemplateRepository } from './repositories/content-template.repository';

@Module({
  controllers: [AdminContentTemplateController],
  providers: [
    ContentTemplateRepository,
    ContentRendererService,
    ContentTemplateExecutionService,
    AdminContentTemplateService,
  ],
  exports: [ContentTemplateExecutionService],
})
export class ContentTemplateModule {}
