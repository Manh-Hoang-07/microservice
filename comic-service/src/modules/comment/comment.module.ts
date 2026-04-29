import { Module } from '@nestjs/common';
import { AdminCommentController } from './admin/controllers/comments.controller';
import { AdminCommentService } from './admin/services/comments.service';
import { PublicCommentController } from './public/controllers/comments.controller';
import { PublicCommentService } from './public/services/comments.service';
import { UserCommentController } from './user/controllers/comments.controller';
import { UserCommentService } from './user/services/comments.service';

@Module({
  controllers: [AdminCommentController, PublicCommentController, UserCommentController],
  providers: [AdminCommentService, PublicCommentService, UserCommentService],
})
export class CommentModule {}
