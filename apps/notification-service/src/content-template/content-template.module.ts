import { Module } from '@nestjs/common';
import { ContentRendererService } from './services/content-renderer.service';
import { ContentTemplateExecutionService } from './services/content-template-execution.service';
import { AdminContentTemplateController } from './admin/controllers/content-template.controller';
import { AdminContentTemplateService } from './admin/services/content-template.service';

@Module({
  controllers: [AdminContentTemplateController],
  providers: [
    ContentRendererService,
    ContentTemplateExecutionService,
    AdminContentTemplateService,
  ],
  exports: [ContentTemplateExecutionService],
})
export class ContentTemplateModule {}
