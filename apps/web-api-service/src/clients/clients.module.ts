import { Global, Module } from '@nestjs/common';
import { ComicClient } from './comic.client';
import { PostClient } from './post.client';

@Global()
@Module({
  providers: [ComicClient, PostClient],
  exports: [ComicClient, PostClient],
})
export class ClientsModule {}
