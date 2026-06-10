import { Module } from '@nestjs/common';
import { GroupPostController } from './controllers/group-post.controller';
import { GroupPostService } from './services/group-post.service';
import { IamClient } from '../../../clients/iam.client';
import { PostRepository } from '../repositories/post.repository';
import { CategoryModule } from '../../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [GroupPostController],
  providers: [GroupPostService, IamClient, PostRepository],
})
export class GroupPostModule {}
