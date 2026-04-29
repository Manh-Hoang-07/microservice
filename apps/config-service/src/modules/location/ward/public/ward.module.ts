import { Module } from '@nestjs/common';
import { PublicWardController } from './controllers/ward.controller';
import { AdminWardModule } from '../admin/ward.module';

@Module({
  imports: [AdminWardModule],
  controllers: [PublicWardController],
})
export class PublicWardModule {}
