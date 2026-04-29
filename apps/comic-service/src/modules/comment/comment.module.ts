import { Module } from '@nestjs/common';
import { AdminCommentController } from './admin/controllers/comments.controller';
import { AdminCommentService } from './admin/services/comments.service';
import { PublicCommentController } from './public/controllers/comments.controller';
import { PublicCommentService } from './public/services/comments.service';
import { UserCommentController } from './user/controllers/comments.controller';
import { UserCommentService } from './user/services/comments.service';
import { ComicCommentRepository } from './repositories/comic-comment.repository';

@Module({
  controllers: [AdminCommentController, PublicCommentController, UserCommentController],
  providers: [ComicCommentRepository, AdminCommentService, PublicCommentService, UserCommentService],
  exports: [ComicCommentRepository],
})
export class CommentModule {}
