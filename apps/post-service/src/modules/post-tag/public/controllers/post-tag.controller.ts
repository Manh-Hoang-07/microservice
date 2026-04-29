import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicPostTagService } from '../services/post-tag.service';

@ApiTags('Public Post Tags')
@Controller('public/post-tags')
export class PublicPostTagController {
  constructor(private readonly tagService: PublicPostTagService) {}

  @Public()
  @Get()
  async getAll() {
    return this.tagService.getAll();
  }
}
