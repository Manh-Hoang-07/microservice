import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { ProvinceRepositoryImpl } from './province.repository.impl';
import { PROVINCE_REPOSITORY } from './province.repository';

@Module({
  controllers: [ProvinceController],
  providers: [
    ProvinceService,
    {
      provide: PROVINCE_REPOSITORY,
      useClass: ProvinceRepositoryImpl,
    },
  ],
  exports: [ProvinceService],
})
export class ProvinceModule {}
