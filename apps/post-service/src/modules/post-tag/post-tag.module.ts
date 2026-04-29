import { Module } from '@nestjs/common';
import { AdminPostTagController } from './admin/controllers/post-tag.controller';
import { AdminPostTagService } from './admin/services/post-tag.service';
import { PublicPostTagController } from './public/controllers/post-tag.controller';
import { PublicPostTagService } from './public/services/post-tag.service';

@Module({
  controllers: [AdminPostTagController, PublicPostTagController],
  providers: [AdminPostTagService, PublicPostTagService],
})
export class PostTagModule {}
