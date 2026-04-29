import { Module } from '@nestjs/common';
import { AdminWardController } from './controllers/ward.controller';
import { WardService } from './services/ward.service';

@Module({
  controllers: [AdminWardController],
  providers: [WardService],
  exports: [WardService],
})
export class AdminWardModule {}
