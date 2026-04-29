import { Module } from '@nestjs/common';
import { PublicMenuController } from './controllers/menu.controller';
import { AdminMenuModule } from '../admin/menu.module';

@Module({
  imports: [AdminMenuModule],
  controllers: [PublicMenuController],
})
export class PublicMenuModule {}
