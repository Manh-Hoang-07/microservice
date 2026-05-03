import { Module } from '@nestjs/common';
import { AdminCommentController } from './admin/controllers/comment.controller';
import { AdminCommentService } from './admin/services/comment.service';
import { PublicCommentController } from './public/controllers/comment.controller';
import { PublicCommentService } from './public/services/comment.service';
import { UserCommentController } from './user/controllers/comment.controller';
import { UserCommentService } from './user/services/comment.service';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  controllers: [AdminCommentController, PublicCommentController, UserCommentController],
  providers: [CommentRepository, AdminCommentService, PublicCommentService, UserCommentService],
})
export class CommentModule {}
