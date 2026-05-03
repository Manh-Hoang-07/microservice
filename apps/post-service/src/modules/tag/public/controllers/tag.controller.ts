import { Controller, Get } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicTagService } from '../services/tag.service';

@Controller('public/post-tags')
export class PublicTagController {
  constructor(private readonly tagService: PublicTagService) {}

  @Public()
  @Get()
  async getAll() {
    return this.tagService.getAll();
  }
}
