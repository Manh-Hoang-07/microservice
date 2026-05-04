import { Module } from '@nestjs/common';
import { PublicWardController } from './controllers/ward.controller';
import { PublicWardService } from './services/ward.service';
import { AdminWardModule } from '../admin/ward.module';

@Module({
  imports: [AdminWardModule],
  controllers: [PublicWardController],
  providers: [PublicWardService],
})
export class PublicWardModule {}
