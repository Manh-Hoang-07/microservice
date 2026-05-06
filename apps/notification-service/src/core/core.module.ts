import { Global, Module } from '@nestjs/common';
import { FileLogger } from '@package/bootstrap';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [FileLogger],
  exports: [DatabaseModule, FileLogger],
})
export class CoreModule {}
