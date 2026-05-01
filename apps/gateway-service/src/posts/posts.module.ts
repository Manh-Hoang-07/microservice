import { Module } from '@nestjs/common';
import { GatewayPostsController } from './controllers/posts.controller';
import { GatewayPostsService } from './services/posts.service';

@Module({
  controllers: [GatewayPostsController],
  providers: [GatewayPostsService],
})
export class GatewayPostsModule {}
