import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ListProjectAdminQueryDto } from '../dtos/list-project.query.dto';

@Controller('admin/projects')
export class AdminProjectController {
  constructor(private readonly projectService: AdminProjectService) {}

  @Permission('cms.project.manage')
  @Get()
  async getList(@Query() query: ListProjectAdminQueryDto) {
    return this.projectService.getList(query);
  }

  @Permission('cms.project.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.projectService.getOne(id);
  }

  @Permission('cms.project.manage')
  @AuditLog({ action: 'cms.project.create', resource: 'project' })
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Permission('cms.project.manage')
  @AuditLog({ action: 'cms.project.update', resource: 'project' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Permission('cms.project.manage')
  @AuditLog({ action: 'cms.project.delete', resource: 'project' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.projectService.delete(id);
  }
}
