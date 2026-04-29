import { Module } from '@nestjs/common';
import { AdminPostCommentController } from './admin/controllers/post-comment.controller';
import { AdminPostCommentService } from './admin/services/post-comment.service';
import { PublicPostCommentController } from './public/controllers/post-comment.controller';
import { PublicPostCommentService } from './public/services/post-comment.service';
import { UserPostCommentController } from './user/controllers/post-comment.controller';
import { UserPostCommentService } from './user/services/post-comment.service';
import { PostCommentRepository } from './repositories/post-comment.repository';

@Module({
  controllers: [AdminPostCommentController, PublicPostCommentController, UserPostCommentController],
  providers: [PostCommentRepository, AdminPostCommentService, PublicPostCommentService, UserPostCommentService],
})
export class PostCommentModule {}
