import { Module } from '@nestjs/common';
import { AdminPostController } from './admin/controllers/post.controller';
import { AdminPostService } from './admin/services/post.service';
import { PublicPostController } from './public/controllers/post.controller';
import { PublicPostService } from './public/services/post.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  controllers: [AdminPostController, PublicPostController],
  providers: [PostRepository, AdminPostService, PublicPostService],
  exports: [PostRepository],
})
export class PostModule {}
