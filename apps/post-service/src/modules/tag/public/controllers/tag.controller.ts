import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { PublicTagService } from '../services/tag.service';

@ApiTags('Public Post Tags')
@Controller('public/post-tags')
export class PublicTagController {
  constructor(private readonly tagService: PublicTagService) {}

  @Public()
  @Get()
  async getAll() {
    return this.tagService.getAll();
  }
}
