import { Module } from '@nestjs/common';
import { ContextController } from './admin/controllers/context.controller';
import { ContextService } from './admin/services/context.service';
import { ContextRepository } from './repositories/context.repository';

@Module({
  controllers: [ContextController],
  providers: [ContextService, ContextRepository],
})
export class ContextModule {}
