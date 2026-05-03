import { Module } from '@nestjs/common';
import { AdminProjectController } from './admin/controllers/project.controller';
import { AdminProjectService } from './admin/services/project.service';
import { PublicProjectController } from './public/controllers/project.controller';
import { PublicProjectService } from './public/services/project.service';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  controllers: [AdminProjectController, PublicProjectController],
  providers: [ProjectRepository, AdminProjectService, PublicProjectService],
  exports: [ProjectRepository],
})
export class ProjectModule {}
