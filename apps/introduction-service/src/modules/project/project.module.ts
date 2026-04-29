import { Module } from '@nestjs/common';
import { AdminProjectController } from './admin/controllers/project.controller';
import { AdminProjectService } from './admin/services/project.service';
import { PublicProjectController } from './public/controllers/project.controller';
import { PublicProjectService } from './public/services/project.service';

@Module({
  controllers: [AdminProjectController, PublicProjectController],
  providers: [AdminProjectService, PublicProjectService],
  exports: [PublicProjectService],
})
export class ProjectModule {}
