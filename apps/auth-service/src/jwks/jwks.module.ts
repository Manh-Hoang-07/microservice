import { Global, Module } from '@nestjs/common';
import { JwksService } from './services/jwks.service';
import { JwksController } from './controllers/jwks.controller';

@Global()
@Module({
  controllers: [JwksController],
  providers: [JwksService],
  exports: [JwksService],
})
export class JwksModule {}
