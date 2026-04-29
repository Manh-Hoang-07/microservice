import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicProjectService } from '../services/project.service';

@ApiTags('Public Projects')
@Controller('public/projects')
export class PublicProjectController {
  constructor(private readonly projectService: PublicProjectService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.projectService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.projectService.getBySlug(slug);
  }
}
