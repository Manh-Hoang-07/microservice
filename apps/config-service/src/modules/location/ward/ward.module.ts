import { Module } from '@nestjs/common';
import { WardController } from './ward.controller';
import { WardService } from './ward.service';
import { WardRepositoryImpl } from './ward.repository.impl';
import { WARD_REPOSITORY } from './ward.repository';

@Module({
  controllers: [WardController],
  providers: [
    WardService,
    {
      provide: WARD_REPOSITORY,
      useClass: WardRepositoryImpl,
    },
  ],
  exports: [WardService],
})
export class WardModule {}
